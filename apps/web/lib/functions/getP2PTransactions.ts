import { getServerSession } from "next-auth";
import authOptions from "../auth";
import prisma from "@repo/database";
import { session } from "../../types/interfaces";

export default async function getP2PTransactions() {
  const session = (await getServerSession(authOptions)) as session;
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
