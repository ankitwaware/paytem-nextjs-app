"use server";

import { getServerSession } from "next-auth";
import authOptions from "../auth";
import prisma from "@repo/database";

export async function createOnrampTransaction(
  provider: string,
  amount: number,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user.uid) {
    // redirect("/signin");
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  const txn = await prisma.onRampTransaction.create({
    data: {
      status: "Processing",
      token: token,
      amount: amount * 100,
      provider: provider,
      startTime: new Date(),
      userId: Number(session.user.uid),
    },
  });

  return {
    message: "Done",
    txn: txn,
  };
}
