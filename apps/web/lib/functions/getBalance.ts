import { getServerSession } from "next-auth";
import prisma from "@repo/database";
import authOptions from "../auth";

export default async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userBalances = await prisma.balance.findUnique({
    where: {
      userId,
    },
    select: {
      amount: true,
      locked: true,
    },
  });

  return userBalances;
}
