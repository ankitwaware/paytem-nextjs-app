import { getServerSession } from "next-auth";
import prisma from "@repo/database/client";
import authOptions from "../auth";

export default async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userTransactions = await prisma.onRampTransaction.findMany({
    where: {
      userId,
    },
  });

  return userTransactions;
}
