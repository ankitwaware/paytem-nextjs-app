import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";

export default function Page() {
  return (
    <div className="h-80 w-full border-2 px-6 pt-4">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Transfer</h1>

      <div className="grid size-full grid-cols-1 grid-rows-3 gap-4 md:grid-flow-col md:grid-cols-2">
        <AddMoney className="col-span-1 row-span-1 md:row-span-3" />
        <Balance className="" />
        <OnRampTransaction className="bg-white md:row-span-2" />
      </div>
    </div>
  );
}
