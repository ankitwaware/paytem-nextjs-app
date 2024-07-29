"use client";

import { useState } from "react";
import Card from "./reusable/Card";

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
    <Card title="Add Moeny" className={`${className}`}>
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
        className="self-center rounded-md bg-gray-950 p-2 px-3 text-white"
        onClick={onAddMoneyHandler}
      >
        Add Money
      </button>
    </Card>
  );
}
