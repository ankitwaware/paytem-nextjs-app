import TransactionItem from "@repo/ui/TransactionItem";
<<<<<<< Updated upstream
<<<<<<< HEAD
import Card from "@repo/ui/card";
=======
import Card from "@repo/ui/Card";
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
import Card from "@repo/ui/card";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< HEAD
        <div className="flex h-12 items-center justify-center">
=======
        <div className="flex h-12 justify-center items-center">
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
        <div className="flex h-12 items-center justify-center">
>>>>>>> Stashed changes
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
