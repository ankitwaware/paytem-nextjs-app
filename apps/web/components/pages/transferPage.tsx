import AddMoney from "../transferComponents/addMoney";
import Balance from "../transferComponents/balance";
import OnRampTransaction from "../transferComponents/onRampTransaction";

export default function TransferPage() {
  return (
    <div className="w-full border-2 px-6 pt-4">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Transfer</h1>

      <div className="flex gap-x-4">
        <AddMoney className="flex-1" />
        <div className="flex flex-1 flex-col gap-y-4">
          <Balance className="h-44" />
          <OnRampTransaction />
        </div>
      </div>
    </div>
  );
}
