import PerToPerTransactions from "../pTopComponents/perToPerTransactions";
import PerToPerTranferForm from "../pTopComponents/perToPerTransferFrom";

export default function PerToPerPage() {
  return (
    <div className="w-full px-6 pt-4">
      <h1 className="mb-2 text-2xl font-bold text-blue-600">
        Transfer to Number
      </h1>

      <div className="flex justify-around">
        <PerToPerTranferForm />
        <PerToPerTransactions className="mt-9 min-w-[450px] self-start" />
      </div>
    </div>
  );
}
