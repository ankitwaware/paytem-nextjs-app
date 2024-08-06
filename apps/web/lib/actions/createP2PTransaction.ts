"use server";

import prisma from "@repo/database";
import { getServerSession } from "next-auth";
import authOptions from "../auth";

export default async function createP2PTransaction(
  token: string,
  amount: string,
  toPhoneNumber: string,
) {
  const session = await getServerSession(authOptions);
  const fromUserId = Number(session?.user.uid!);

  const toUser = await prisma.user.findFirst({
    where: {
      phoneNumber: toPhoneNumber,
    },
    select: {
      id: true,
    },
  });

  if (!toUser) {
    console.log("to user", toUser);
    return {
      message: "no user with number",
    };
  }

  if (toUser.id === fromUserId) {
    return {
      message: "not allowed to send self",
    };
  }

  const newTxn = await prisma.p2pTransaction.create({
    data: {
      token: token,
      amount: Number(amount) * 100,
      timeStamp: new Date(),
      fromUserId: fromUserId,
      toUserId: toUser?.id,
    },
  });

  console.log("at create p2ptxn", newTxn);

  return {
    message: "created",
  };
}
