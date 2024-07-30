import OnRampTransaction from "../../../components/OnRampTransaction";
import { getOnRampTransactions } from "../transfer/page";

export default async function Page() {
  const userTransactions = await getOnRampTransactions();

  return <OnRampTransaction transactions={userTransactions} className="w-full m-8" />;
}
