import Card from "./reusable/Card";

interface BalanceProp {
  className?: string;
  balances: {
    amount: number;
    locked: number;
  } | null;
}

export default function Balance({
  className,
  balances: { amount, locked},
}: BalanceProp) {
  const totalBalance = amount! + locked!;

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked balnce" balance={amount} />
      <BalanceItem title="locked balnce" balance={locked} />
      <BalanceItem title="Total balnce" balance={totalBalance} />
    </Card>
  );
}

// todo -@ankitwaware  add title/balance type interface
function BalanceItem({
  balance,
  className,
  title,
}: {
  balance: number | 0;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 py-1.5 ${className}`}
    >
      <h4>{title}</h4>
      <span>{balance / 100} INR</span>
    </div>
  );
}
