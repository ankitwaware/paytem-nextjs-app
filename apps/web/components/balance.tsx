import Card from "@repo/ui/card";
import BalanceItem from "@repo/ui/balCard";
import getBalance from "../lib/getBalance";

export default async function Balance({ className }: { className?: string }) {
  const userBalancres = await getBalance();
  const totalBal = userBalancres?.amount!  + userBalancres?.locked!;

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={userBalancres?.amount} />
      <BalanceItem title="locked" balance={userBalancres?.amount} />
      <BalanceItem title="Total" balance={totalBal} />
    </Card>
  );
}
