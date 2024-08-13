export interface TransactionItemProp {
  className?: string;
  id?: number;
  status: "Success" | "failure" | "Processing";
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
  let Indianrupee = "₹ 0.00";
  if (amount) {
    Indianrupee = new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "INR",
    }).format(amount / 100);
  }

  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 p-0.5 text-sm ${className}`}
    >
      <div>
        <p>Recived</p>
        <span className="text-xs text-slate-400">
          {startTime.toString().substring(0, 21)}
        </span>
      </div>

      <p>{status}</p>
      <p>{provider}</p>
      <p>+ {Indianrupee}</p>
    </div>
  );
}
