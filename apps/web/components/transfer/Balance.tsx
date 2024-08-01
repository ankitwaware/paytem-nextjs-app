import Card from "@repo/ui/card";
import BalanceItem from "../../../../packages/ui/src/BalanceItem";
import getBalance from "../../lib/functions/getBalance";

export default async function Balance({ className }: { className?: string }) {
  const userBalancres = await getBalance();

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={userBalancres?.amount} />
      <BalanceItem title="locked" balance={userBalancres?.locked} />
      <BalanceItem
        title="Total"
        balance={userBalancres?.amount! + userBalancres?.locked! || 0}
      />
    </Card>
  );
}
