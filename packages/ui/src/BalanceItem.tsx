export default function BalanceItem({
  balance,
  className,
  title,
}: {
  balance: number;
  className?: string;
  title: "Unlocked" | "locked" | "Total";
}) {
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 py-1.5 ${className}`}
    >
      <h4>{`${title} balance`}</h4>
      <span>{balance / 100} INR</span>
    </div>
  );
}
