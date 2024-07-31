"use client";

import Card from "@repo/ui/Card";
import BalanceItem from "../../../../packages/ui/src/BalanceItem";
import { useBalance } from "@repo/store/useBalance";

export default function Balance({
  className,
}: {
  className?: string;
  
}) {
  const { unlocked, locked, total } = useBalance();

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={unlocked} />
      <BalanceItem title="locked" balance={locked} />
      <BalanceItem title="Total" balance={total} />
    </Card>
  );
}
