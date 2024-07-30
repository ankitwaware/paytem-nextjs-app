import Card from "./reusable/Card";

import { onRampStatus } from "@repo/database/client";

interface Transaction {
  id: number;
  status: onRampStatus;
  amount: number;
  provider: string;
  startTime: Date;
};

interface OnRampTransactionProp {
  className?: string;
  transactions: Transaction[] | null;
};

export default function OnRampTransaction({
  className,
  transactions,
}: OnRampTransactionProp) {
  return (
    <Card title="Recent Transactions" className={`${className}`}>
      {transactions!.map((transaction, index) => {
        return (
          <TransactionItem
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

function TransactionItem({
  id,
  status,
  startTime,
  amount,
  provider,
}: Transaction) {
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
