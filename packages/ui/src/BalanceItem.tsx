<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
interface BalanceItemProp {
  balance?: number;
  className?: string;
  title: "Unlocked" | "locked" | "Total";
}

<<<<<<< Updated upstream
=======
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
>>>>>>> Stashed changes
export default function BalanceItem({
  balance,
  className,
  title,
<<<<<<< Updated upstream
<<<<<<< HEAD
}: BalanceItemProp) {
=======
}: {
  balance?: number;
  className?: string;
  title: "Unlocked" | "locked" | "Total";
}) {
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
}: BalanceItemProp) {
>>>>>>> Stashed changes
  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 py-1.5 ${className}`}
    >
      <h4>{`${title} balance`}</h4>
      {balance ? <span>{balance / 100} INR</span> : <span>0 INR</span>}
    </div>
  );
}
