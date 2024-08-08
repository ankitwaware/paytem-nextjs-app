import PersonToPerson from "../../../components/p2p/personToPerson";
import PersonToPersonTransactions from "../../../components/p2p/perToPerTransactions";

export default function Page() {
  return (
    <div className="w-full px-6 pt-4">
      <h1 className="mb-2 text-2xl font-bold text-blue-600">
        Transfer to Number
      </h1>

      <div className="flex justify-around">
        <PersonToPerson />
        <PersonToPersonTransactions className="mt-9 min-w-[450px] self-start" />
      </div>
    </div>
  );
}
