import Card from "@repo/ui/card";
import TransactionItem from "@repo/ui/txnItemCard";
import type { OnRampTxn } from "../types/types";
import getOnRampTransactions from "../lib/getOnRampTransactions";

export default async function OnRampTransaction({
  className,
}: {
  className?: string;
}) {
  const transactions: OnRampTxn[] = await getOnRampTransactions();
  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {transactions.length === 0 ? (
        <div className="flex h-12 items-center justify-center">
          <p className="text-gray-950">No recent transcations</p>
        </div>
      ) : (
        <>
          {transactions.map((transaction: OnRampTxn) => {
            const { status, id, startTime, amount, provider, token } =
              transaction;
            return (
              <TransactionItem
                key={token}
                id={id}
                status={status}
                startTime={startTime}
                amount={amount}
                provider={provider}
              />
            );
          })}
        </>
      )}
    </Card>
  );
}
