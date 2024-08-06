"use server";

import prisma from "@repo/database";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { revalidatePath } from "next/cache";

export async function createOnrampTransaction(
  provider: string,
  amount: string,
  token: string,
) {
  const session = await getServerSession(authOptions);

  const tnx = await prisma.onRampTransaction.create({
    data: {
      status: "Processing",
      token: token,
      amount: Number(amount) * 100,
      provider: provider,
      startTime: new Date(),
      userId: Number(session?.user?.uid),
    },
    select: {
      userId: true,
    },
  });

  revalidatePath("/dashboard/transfer");
  return {
    message: "Done",
    tnx,
  };
}
