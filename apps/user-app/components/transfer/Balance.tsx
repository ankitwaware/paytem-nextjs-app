"use client";

import Card from "@repo/ui/Card";
import BalanceItem from "../../../../packages/ui/src/BalanceItem";
import { setBalance, useBalance } from "@repo/store/useBalance";
import { useEffect } from "react";

export default function Balance({
  className,
  balances,
}: {
  className?: string;
  balances: {
    amount: number;
    locked: number;
  } | null;
}) {
  const { unlocked, locked, total } = useBalance();

  // useEffect(() => {
  //   setBalance({ locked: balances?.locked!, unlocked: balances?.amount! });
  // }, [balances]);

  return (
    <Card title="Balance" className={`${className}`}>
      <BalanceItem title="Unlocked" balance={unlocked} />
      <BalanceItem title="locked" balance={locked} />
      <BalanceItem title="Total" balance={total} />
    </Card>
  );
}
