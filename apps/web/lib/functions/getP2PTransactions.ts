import { getServerSession } from "next-auth";
import prisma from "@repo/database/client";
import authOptions from "../auth";

export default async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userTransactions = await prisma.p2pTransaction.findMany({
    where: {
      OR: [
        {
          fromUserId: userId,
        },
        {
          AND: {
            toUserId: userId,
          },
        },
      ],
    },
    include: {
      fromUser: {
        select: {
          phoneNumber: true,
        },
      },
      toUser: {
        select: {
          phoneNumber: true,
        },
      },
    },
  });

  return userTransactions;
}
