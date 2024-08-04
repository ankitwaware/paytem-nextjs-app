import TransactionItem from "@repo/ui/TransactionItem";
import Card from "@repo/ui/card";
import getOnRampTransactions from "../../lib/functions/getOnRampTransactions";

export default async function OnRampTransaction({
  className,
}: {
  className?: string;
}) {
  const transactions = await getOnRampTransactions();
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
        const { status, id, startTime, amount, provider } = transaction;
        return (
          <TransactionItem
            key={index}
            id={id}
            status={status}
            startTime={startTime}
            amount={amount}
            provider={provider}
          />
        );
      })}
    </Card>
  );
}
