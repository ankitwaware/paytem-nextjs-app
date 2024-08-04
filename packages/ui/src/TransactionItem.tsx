import { onRampStatus } from "@repo/database";

export interface TransactionItemProp {
  className?: string;
  id?: number;
  status: onRampStatus;
  amount: number;
  provider: string;
  startTime: Date;
}

export default function TransactionItem({
  status,
  startTime,
  amount,
  provider,
  className,
}: TransactionItemProp) {
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 p-0.5 text-sm ${className}`}
    >
      <div>
        <p>Recived INR</p>
        <span className="text-xs text-slate-400">
          {startTime.toString().substring(0, 21)}
        </span>
      </div>

      <p>{status}</p>
      <p>{provider}</p>
      <p>+ Rs {amount / 100}</p>
    </div>
  );
}
