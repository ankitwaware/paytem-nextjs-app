import Card from "./reusable/Card";

enum Status {
  Success,
  failure,
  Processing,
}

type TransactionProp = {
  id: number;
  status: Status;
  amount: number;
  provider: string;
  startTime: Date;
};

interface OnRampTransactionProp extends TransactionProp {
  className?: string;
  OnRampTransactions: TransactionProp[] | null;
};

export default function OnRampTransaction({
  className,
  OnRampTransactions,
}: OnRampTransactionProp) {
  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {OnRampTransactions!.map((transaction, index) => {
        return (
          <Transaction
            key={index}
            id={transaction.id}
            status={transaction.status}
            startTime={transaction.startTime}
            amount={transaction.amount}
            provider={transaction.provider}
          />
        );
      })}
    </Card>
  );
}

function Transaction({
  id,
  status,
  startTime,
  amount,
  provider,
}: TransactionProp) {
  console.log("txn id", id);

  return (
    <div className="flex items-center justify-between border-b border-slate-600 p-0.5 text-sm">
      <div>
        <p>Recived INR</p>
        <span className="text-xs text-slate-400">{startTime.toString().substring(0,21)}</span>
      </div>

      <p>{status}</p>
      <p>{provider}</p>
      <p>+ Rs {amount / 100}</p>
    </div>
  );
}
