"use server";
import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import authOptions from "./auth";

export default async function createOnrampTransaction(
  provider: string,
  amount: string,
  token: string,
) {
  const session = await getServerSession(authOptions);

  const tnx = await prisma.onRampTransaction.create({
    data: {
      status: "Processing",
      token,
      amount: Number(amount) * 100,
      provider,
      startTime: new Date(),
      userId: Number(session?.user.uid),
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
