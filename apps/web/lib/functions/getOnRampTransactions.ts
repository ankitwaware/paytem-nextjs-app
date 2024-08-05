import { getServerSession } from "next-auth";
import authOptions from "../auth";
import prisma from "@repo/database";

export default async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userTransactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
  });

  return userTransactions;
}
