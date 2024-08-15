type Txn = {
  fromUser: {
    phoneNumber: string;
  };
  toUser: {
    phoneNumber: string;
  };
} & {
  id: number;
  token: string;
  amount: number;
  status: "Success" | "failure" | "Processing";
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
};

interface OnRampTxn {
  id: number;
  status: "Success" | "failure" | "Processing";
  token: string;
  amount: number;
  provider: string;
  startTime: Date;
  userId: number;
};

export type { Txn, OnRampTxn };
