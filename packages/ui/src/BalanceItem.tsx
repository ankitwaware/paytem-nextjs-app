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
  let Indianrupee = "₹ 0.00";
  if (balance) {
    Indianrupee = new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "INR",
    }).format(balance / 100);
  }

  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 py-1.5 ${className}`}
    >
      <h4>{`${title} balance`}</h4>
      <span>{Indianrupee}</span>
    </div>
  );
}
