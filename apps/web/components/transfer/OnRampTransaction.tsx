import TransactionItem from "@repo/ui/TransactionItem";
import Card from "@repo/ui/Card";
import getOnRampTransactions from "../../lib/functions/getOnRampTransactions";

export default async function OnRampTransaction({
  className,
}: {
  className?: string;
}) {
  const transactions = await getOnRampTransactions();
  
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
