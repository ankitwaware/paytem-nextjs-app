import { getServerSession } from "next-auth";
import authOptions from "../auth";
import prisma from "@repo/database";

export default async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userBalances = await prisma.balance.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true,
      locked: true,
    },
  });

  return userBalances;
}


