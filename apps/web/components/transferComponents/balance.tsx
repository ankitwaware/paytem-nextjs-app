import Card from "@repo/ui/card";
import BalanceItem from "@repo/ui/balanceItem";
import getBalance from "../../lib/functions/getBalance";

export default async function Balance({ className }: { className?: string }) {
  const userBalancres = await getBalance();
  const totalBal = (userBalancres?.amount || 0) + (userBalancres?.locked || 0);

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={userBalancres?.amount} />
      <BalanceItem title="locked" balance={userBalancres?.locked} />
      <BalanceItem title="Total" balance={totalBal} />
    </Card>
  );
}
