import TransactionItem from "@repo/ui/transactionItem";
import Card from "@repo/ui/card";
import getOnRampTransactions from "../../lib/functions/getOnRampTransactions";

export default async function OnRampTransaction({
  className,
}: {
  className?: string;
}) {
  const transactions = await getOnRampTransactions();
  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {transactions.length === 0 ? (
        <div className="flex h-12 items-center justify-center">
          <p className="text-gray-950">No recent transcations</p>
        </div>
      ) : (
        <>
          {transactions.map((transaction) => {
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
