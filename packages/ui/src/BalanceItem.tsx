interface BalanceItemProp {
  balance?: number;
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
      {balance ? <span>{balance / 100} INR</span> : <span>0 INR</span>}
    </div>
  );
}
