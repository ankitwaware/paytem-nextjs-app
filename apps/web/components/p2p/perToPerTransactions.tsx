import Card from "@repo/ui/card";

import getP2PTransactions from "../../lib/functions/getP2PTransactions";

import { getServerSession } from "next-auth";
import authOptions from "../../lib/auth";
import { session } from "../../types/interfaces";
import P2PTransactionItem from "./p2pTransactionItem";

export default async function PersonToPersonTransactions({
  className,
}: {
  className?: string;
}) {
  const session = (await getServerSession(authOptions)) as session;
  const currentUserId = Number(session.user.uid);
  const transactions = await getP2PTransactions();

  if (transactions.length === 0) {
    return (
      <Card title="Recent Transactions" className={`${className}`}>
        <div className="flex h-12 items-center justify-center">
          <p className="text-gray-950">No recent transcations</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {transactions!.map((transaction, index) => {
        const {
          id,
          token,
          amount,
          status,
          timeStamp,
          fromUserId,
          toUserId,
          toUser: { phoneNumber },
          fromUser:{phoneNumber:fromUserPhoneNumber}
        } = transaction;

        return (
          <P2PTransactionItem
            key={index}
            id={id}
            token={token}
            amount={amount}
            status={status}
            timeStamp={timeStamp}
            fromUserId={fromUserId}
            toUserId={toUserId}
            toUserPhoneNumber={phoneNumber}
            fromUserPhoneNumber={fromUserPhoneNumber}
            currentUserId={currentUserId}
          />
        );
      })}
    </Card>
  );
}


