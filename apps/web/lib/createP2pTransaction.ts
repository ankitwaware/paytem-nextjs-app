"use server";

import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";
import authOptions from "./auth";

export default async function createP2PTransaction(
  token: string,
  amount: string,
  toPhoneNumber: string,
) {
  const session = await getServerSession(authOptions);
  const fromUserId = Number(session?.user.uid);

  const toUser = await prisma.user.findFirst({
    where: {
      phoneNumber: toPhoneNumber,
    },
    select: {
      id: true,
    },
  });

  if (!toUser) {
    return {
      message: "no user with number",
    };
  }

  if (toUser.id === fromUserId) {
    return {
      message: "not allowed to send self",
    };
  }

  await prisma.p2pTransaction.create({
    data: {
      token,
      amount: Number(amount) * 100,
      timeStamp: new Date(),
      fromUserId,
      toUserId: toUser.id,
    },
  });

  return {
    message: "created",
  };
}
