import { type onRampStatus } from "@repo/database";
import { getServerSession } from "next-auth";
import authOptions from "../../lib/auth";

export interface P2PTransactionItemProp {
  className?: string;
  id: number;
  token: string;
  amount: number;
  status: onRampStatus;
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
  toUserPhoneNumber: string;
  fromUserPhoneNumber: string;
}

export default async function PToPTxnItem({
  id,
  token,
  amount,
  status,
  timeStamp,
  fromUserId,
  toUserId,
  toUserPhoneNumber,
  fromUserPhoneNumber,
  className,
}: P2PTransactionItemProp) {
  const Indianrupee = new Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
  }).format(amount / 100);
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
        {/* if current user send then reciver phone number else other user sended phone number */}
        {currentUserId === fromUserId ? toUserPhoneNumber : fromUserPhoneNumber}
      </p>
      <p>+ Rs {Indianrupee}</p>
    </div>
  );
}
