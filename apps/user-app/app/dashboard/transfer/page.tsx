import { getServerSession } from "next-auth";
import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";
import authOptions from "../../../lib/auth";
import { PrismaClient } from "@repo/database/client";

const client = new PrismaClient();

async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userBalances = await client.balance.findUnique({
    where: {
      userId: userId,
    },
    select: {
      amount: true,
      locked: true,
    },
  });

  return userBalances;
}

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.uid);

  const userTransactions = await client.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      status: true,
      amount: true,
      provider: true,
      startTime: true,
    },
  });

  return userTransactions;
}

// user transfer page
export default async function Page() {
  const balances = await getBalance();
  const userTransactions = await getOnRampTransactions();

  return (
    <div className="w-full border-2 px-6 pt-4">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Transfer</h1>

      <div className="flex gap-x-4">
        <AddMoney className="flex-1" />
        <div className="flex flex-1 flex-col gap-y-4">
          <Balance balances={balances} className="h-44" />
          <OnRampTransaction transactions={userTransactions} />
        </div>
      </div>
    </div>
  );
}
