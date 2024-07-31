import AddMoney from "../components/transfer/AddMoney";
import Balance from "../components/transfer/Balance";
import OnRampTransaction from "../components/transfer/OnRampTransaction";
import getBalance from "../lib/functions/getBalance";

export default async function TransferPage() {
  const balances = await getBalance();
  return (
    <div className="w-full border-2 px-6 pt-4">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Transfer</h1>

      <div className="flex gap-x-4">
        <AddMoney balances={balances} className="flex-1" />
        <div className="flex flex-1 flex-col gap-y-4">
          <Balance className="h-44" />
          <OnRampTransaction />
        </div>
      </div>
    </div>
  );
}
