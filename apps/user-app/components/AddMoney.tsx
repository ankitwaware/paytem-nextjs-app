// "use client";

// import { useRef } from "react";

export default function AddMoney() {
  
  return (
    <div className="flex flex-col justify-between rounded-lg bg-slate-50 p-4 font-medium">
      <h3 className="text-xl">Add Money</h3>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Amount"
          autoComplete="off"
          className="rounded-md border border-slate-300 p-2"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="bank">Bank</label>
        <select
          id="bank"
          className="rounded-md border border-slate-300 p-2 capitalize"
        >
          <option value={"hdfc"} selected>
            hdfc
          </option>
          <option value={"axis"}>axis</option>
          <option value={"kotak"}>kotak</option>
        </select>
      </div>

      <button className="self-center rounded-md bg-slate-700 p-2 px-3 text-white">
        Add Money
      </button>
    </div>
  );
}
