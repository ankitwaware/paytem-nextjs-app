"use server";

import prisma from "@repo/database";

export async function createOnrampTransaction(
  provider: string,
  amount: string,
  token: string,
  userId: string,
) {
  await prisma.onRampTransaction.create({
    data: {
      status: "Processing",
      token: token,
      amount: Number(amount) * 100,
      provider: provider,
      startTime: new Date(),
      userId: Number(),
    },
  });

  return {
    message: "Done",
  };
}
