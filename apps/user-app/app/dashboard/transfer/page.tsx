import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";

export default function Page() {
  return (
    <div className="w-full bg-red-500 px-8 pt-8">
      <h1 className="text-4xl font-bold text-blue-600">Transfer</h1>

      <div className="grid grid-cols-2">
        <AddMoney />

        <div className="bg-yellow-400">
          <Balance />
          <OnRampTransaction />
        </div>
      </div>
    </div>
  );
}
