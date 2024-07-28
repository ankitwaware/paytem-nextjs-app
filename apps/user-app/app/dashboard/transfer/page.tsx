import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";

export default function Page() {
  return (
    <div className="w-full px-8 pt-6 border-2">
      <h1 className="text-3xl font-bold text-blue-600">Transfer</h1>

      <div className="grid grid-cols-2 border h-80 border-black">
        <AddMoney />

        <div className="">
          <Balance />
          <OnRampTransaction />
        </div>
      </div>
    </div>
  );
}
