import { getServerSession } from "next-auth";
import authOptions from "../lib/auth";

export interface P2PTransactionItemProp {
  className?: string;
  id: number;
  token: string;
  amount: number;
  status: "Success" | "failure" | "Processing";
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
  toUserPhoneNumber: string;
  fromUserPhoneNumber: string;
}

export default async function PToPTxnItem({
  amount,
  status,
  timeStamp,
  fromUserId,
  toUserPhoneNumber,
  fromUserPhoneNumber,
  className,
}: P2PTransactionItemProp) {

  const session = await getServerSession(authOptions);
  const currentUserId = Number(session?.user.uid);

  return (
    <div
      className={`flex items-center justify-between border-b border-slate-600 p-0.5 text-sm ${className}`}
    >
      <div>
        <p>{currentUserId === fromUserId ? "sent" : "recevied"} </p>
        <span className="text-xs text-slate-400">
          {timeStamp.toString().substring(0, 21)}
        </span>
      </div>

      <p>{status}</p>
      <p>
        {currentUserId === fromUserId ? toUserPhoneNumber : fromUserPhoneNumber}
      </p>
      <p>+ Rs {amount / 100}</p>
    </div>
  );
}
