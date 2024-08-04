import Card from "@repo/ui/card";
<<<<<<< Updated upstream
<<<<<<< HEAD
import BalanceItem from "@repo/ui/balanceItem";
=======
import BalanceItem from "../../../../packages/ui/src/BalanceItem";
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
import BalanceItem from "@repo/ui/balanceItem";
>>>>>>> Stashed changes
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
