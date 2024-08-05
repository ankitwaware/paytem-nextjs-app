import Card from "@repo/ui/card";

import getP2PTransactions from "../../lib/functions/getP2PTransactions";
import { onRampStatus } from "@repo/database";
import { getServerSession } from "next-auth";
import authOptions from "../../lib/auth";
import { session } from "../../types/interfaces";

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
            currentUserId={currentUserId}
          />
        );
      })}
    </Card>
  );
}

export interface P2PTransactionItemProp {
  className?: string;
  id: number;
  token: string;
  amount: number;
  status: onRampStatus;
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
  toUserPhoneNumber: string;
  currentUserId: number;
}

function P2PTransactionItem({
  id,
  token,
  amount,
  status,
  timeStamp,
  fromUserId,
  toUserId,
  toUserPhoneNumber,
  className,
  currentUserId,
}: P2PTransactionItemProp) {
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 p-0.5 text-sm ${className}`}
    >
      <div>
        <p>{currentUserId === fromUserId ? "sent" : "recevied"} INR</p>
        <span className="text-xs text-slate-400">
          {timeStamp.toString().substring(0, 21)}
        </span>
      </div>

      <p>{status}</p>
      <p>{toUserPhoneNumber}</p>
      <p>+ Rs {amount / 100}</p>
    </div>
  );
}
