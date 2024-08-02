"use client";
import Card from "@repo/ui/Card";

import addMoneyTouser from "../../lib/actions/actions";
import { useFormState, useFormStatus } from "react-dom";

const supported_banks = [
  { name: "Hdfc Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "Kotak Bank", redirectUrl: "https://www.kotakbank.com/" },
];

const initialState = { message: "" };

export default function AddMoney({ className }: { className?: string }) {
  const [state, fromAction] = useFormState(addMoneyTouser, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      action={fromAction}
      className={`${className}`}
    >
      <Card title="Add Moeny" className="h-72 justify-between">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            name="amount"
            placeholder="Amount"
            autoComplete="off"
            className="rounded-md border border-slate-300 p-2"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="bank">Bank</label>
          <select
            id="bank"
            name="bank"
            className="rounded-md border border-slate-300 p-2 capitalize"
          >
            {supported_banks.map((bank, index) => {
              return (
                <option defaultValue={bank.name} key={index}>
                  {bank.name}
                </option>
              );
            })}
          </select>
        </div>

        <p aria-live="polite" role="status">
          {state.message && state.message}
        </p>

        <button
          type="submit"
          aria-disabled={pending}
          className="self-center rounded-md bg-gray-950 p-2 px-3 text-white"
        >
          {pending ? "Adding..." : "Add Money"}
        </button>
      </Card>
    </form>
  );
}
