interface BalanceItemProp {
  balance?: number | undefined;
  className?: string;
  title: "Unlocked" | "locked" | "Total";
}

export default function BalanceItem({
  balance,
  className,
  title,
}: BalanceItemProp) {
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 py-1.5 ${className}`}
    >
      <h4>{`${title} balance`}</h4>
      <span>Rs {balance ? balance / 100 : "0.00"}</span>
    </div>
  );
}
