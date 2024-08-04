<<<<<<< Updated upstream
<<<<<<< HEAD
import AddMoney from "../components/transfer/addMoney";
import Balance from "../components/transfer/balance";
import OnRampTransaction from "../components/transfer/onRamptransaction";
=======
import AddMoney from "../components/transfer/AddMoney";
import Balance from "../components/transfer/Balance";
import OnRampTransaction from "../components/transfer/OnRampTransaction";
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
import AddMoney from "../components/transfer/addMoney";
import Balance from "../components/transfer/balance";
import OnRampTransaction from "../components/transfer/onRamptransaction";
>>>>>>> Stashed changes

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
