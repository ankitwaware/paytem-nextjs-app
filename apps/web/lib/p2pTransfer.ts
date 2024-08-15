"use server";

import prisma, { type Balance } from "@repo/database/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import authOptions from "./auth";
import  createP2PTransaction  from "./createP2pTransaction";

export default async function p2pTransferAction(
  toPhoneNumber: string,
  amount: string,
  token: string,
) {
  try {
    await createP2PTransaction(token, amount, toPhoneNumber);
    const session = await getServerSession(authOptions);
    const fromUserId = Number(session?.user.uid);
    // string to number and amount * 100 for decimal amount
    const transferAmount = Number(amount) * 100;

    // find sender account
    const fromAccount = await prisma.user.findFirst({
      where: {
        id: fromUserId,
      },
      select: {
        name: true,
        balance: true,
        phoneNumber: true,
      },
    });

    if (!fromAccount) {
      return {
        message: "Error  while sending",
      };
    }

    // find reciver account
    const toAccount = await prisma.user.findFirst({
      where: {
        phoneNumber: toPhoneNumber,
      },
      select: {
        name: true,
        id: true,
      },
    });

    if (!toAccount) {
      return {
        message: "Failed to send",
        phoneNumber: {
          name: "phoneNumber",
          message: "No user with this number",
        },
      };
    }

    // check sender account has sufficient balance
    if (
      fromAccount.balance?.amount &&
      fromAccount.balance.amount < transferAmount
    ) {
      return {
        message: "Failed to send",
        amount: {
          name: "amount",
          message: "insufficient Balance",
        },
      };
    }

    // send to self not allowed
    if (fromAccount.phoneNumber === toPhoneNumber) {
      return {
        message: "Failed to send",
        phoneNumber: {
          name: "phoneNumber",
          message: "cannot send to self",
        },
      };
    }

    // start transaction in db
    await prisma.$transaction(async (tx) => {
      // lock the sender Balance row in db

      // SELECT FOR UPDATE is a SQL command that’s useful in the context of transactional workloads. It allows you to “lock” the rows returned by a SELECT query until the entire transaction that query is part of has been committed. Other transactions attempting to access those rows are placed into a time-based queue to wait, and are executed chronologically after the first transaction is completed.
      await tx.$queryRaw<Balance>`SELECT * FROM "Balance" WHERE "userId" = ${fromUserId} FOR UPDATE`;

      await tx.balance.update({
        where: {
          userId: fromUserId,
        },
        data: {
          amount: {
            decrement: transferAmount,
          },
        },
      });

      // lock the reciver Balance row in db
      await tx.$queryRaw<Balance>`SELECT * FROM "Balance" WHERE "userId" = ${toAccount.id} FOR UPDATE`;

      await tx.balance.update({
        where: {
          userId: toAccount.id,
        },
        data: {
          amount: {
            increment: transferAmount,
          },
        },
      });
    });

    // after db transaction success the p2p transaction
    await prisma.p2pTransaction.update({
      where: {
        token,
        fromUserId,
        toUserId: toAccount.id,
      },
      data: {
        status: "Success",
      },
    });

    revalidatePath("dashboard/p2p");

    return {
      type: "done",
      message: "Successfully sended",
    };
  } catch (error) {
    return {
      message: "somthing went wrong !",
    };
  }
}
