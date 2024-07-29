export default function OnRampTransaction({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg bg-slate-50 p-4 font-medium ${className}`}
    >
      <h3 className="mb-1 border-b border-slate-600 text-xl">
        Recent Transactions
      </h3>
      <div className="flex items-center justify-between py-2">
        <h4>Unlocked balance</h4>
        <span>0 INR</span>
      </div>
    </div>
  );
}
