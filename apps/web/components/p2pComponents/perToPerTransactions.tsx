import Card from "@repo/ui/card";
import getP2PTransactions from "../../lib/functions/getP2pTransactions";
import PToPTxnItem from "./perTransactionItem";

export default async function PerToPerTransactions({
  className,
}: {
  className?: string;
}) {
  const transactions = await getP2PTransactions();

  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {transactions.length === 0 ? (
        <div className="flex h-12 items-center justify-center">
          <p className="text-gray-950">No recent transcations</p>
        </div>
      ) : (
        <>
          {transactions.map((transaction) => {
            const {
              id,
              token,
              amount,
              status,
              timeStamp,
              fromUserId,
              toUserId,
              toUser: { phoneNumber },
              fromUser: { phoneNumber: fromUserPhoneNumber },
            } = transaction;

            return (
              <PToPTxnItem
                key={token}
                id={id}
                token={token}
                amount={amount}
                status={status}
                timeStamp={timeStamp}
                fromUserId={fromUserId}
                toUserId={toUserId}
                toUserPhoneNumber={phoneNumber}
                fromUserPhoneNumber={fromUserPhoneNumber}
              />
            );
          })}
        </>
      )}
    </Card>
  );
}
