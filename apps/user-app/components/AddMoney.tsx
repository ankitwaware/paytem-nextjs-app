"use client";

import { useState } from "react";

// https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

const supported_banks = [
  { name: "Hdfc Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "Kotak Bank", redirectUrl: "https://www.kotakbank.com/" },
];

export default function AddMoney({ className }: { className?: string }) {
  const [defaultBank, setDefaultBank] = useState(supported_banks[0]?.name);
  const [defaultRedirectURl, setRedirectURl] = useState(
    supported_banks[0]?.redirectUrl,
  );
  const [amount, setAmount] = useState("");

  function onSelectHandler(e) {
    const selectedBank = e.target.value;
    setDefaultBank(selectedBank);

    // redirect url
    setRedirectURl(
      supported_banks.find((bank) => bank.name === selectedBank)?.redirectUrl ||
        "",
    );
  }

  function onAddMoneyHandler(e) {
    console.log("add money", amount);
    console.log("bank", defaultBank);
    console.log("bank url", defaultRedirectURl);
  }

  return (
    <div
      className={`flex flex-col justify-between rounded-lg bg-slate-50 p-4 font-medium ${className}`}
    >
      <h3 className="text-xl">Add Money</h3>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Amount"
          autoComplete="off"
          className="rounded-md border border-slate-300 p-2"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="bank">Bank</label>
        <select
          id="bank"
          className="rounded-md border border-slate-300 p-2 capitalize"
          defaultValue={defaultBank}
          onChange={onSelectHandler}
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

      <button
        className="self-center rounded-md bg-slate-700 p-2 px-3 text-white"
        onClick={onAddMoneyHandler}
      >
        Add Money
      </button>
    </div>
  );
}
