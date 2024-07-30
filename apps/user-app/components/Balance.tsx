import Card from "./reusable/Card";

interface BalanceProp {
  className?: string;
  balances: {
    amount: number;
    locked: number;
  } | null;
}

export default function Balance({ className, balances }: BalanceProp) {
  const totalBalance = balances?.amount! + balances?.locked!;

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={balances?.amount!} />
      <BalanceItem title="locked" balance={balances?.locked!} />
      <BalanceItem title="Total" balance={totalBalance} />
    </Card>
  );
}

function BalanceItem({
  balance,
  className,
  title,
}: {
  balance: number | 0;
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
