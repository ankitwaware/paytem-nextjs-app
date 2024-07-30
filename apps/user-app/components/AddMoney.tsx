"use client";
import Card from "./reusable/Card";

import { addMoneySchema, addMoneyInput } from "../lib/zodSchema/addMoney";
import { Form, useForm, FormSubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOnrampTransaction } from "../lib/actions/createOnrampTransaction";

const supported_banks = [
  { name: "Hdfc Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "Kotak Bank", redirectUrl: "https://www.kotakbank.com/" },
];

export default function AddMoney({ className }: { className?: string }) {
  const {
    control,
    register,

    formState: { errors, isSubmitting },
  } = useForm<addMoneyInput>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      money: 0,
      bank: supported_banks[0]?.name,
    },
    progressive: true,
  });

  const onAddMoneyHandler: FormSubmitHandler<addMoneyInput> = async (
    payload,
  ) => {
    const { data } = payload;

    console.log(data);
    console.log(payload);

    const { bank, money } = data;
    // redirect url of selected Bank
    // const redirectUrl = supported_banks.find(
    //   (supp_bank) => supp_bank.name === bank,
    // )?.redirectUrl;

    try {
      const NewTxn = await createOnrampTransaction(bank, money);

      // window.location.href = redirectUrl || "";

      // fake bank api to handle add Money
      const response = await fetch("http://localhost:8080/hdfcWebhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: NewTxn.txn?.token,
          userId: NewTxn.txn?.userId?.toString(),
          amount: NewTxn.txn?.amount?.toString(),
        }),
      });
      
      if (!response.ok) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      control={control}
      method="post"
      onSubmit={onAddMoneyHandler}
      headers={{ "Content-Type": "application/json" }}
      className={`${className}`}
    >
      <Card title="Add Moeny" className="h-72 justify-between">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            {...register("money")}
            type="text"
            placeholder="Amount"
            autoComplete="off"
            className="rounded-md border border-slate-300 p-2"
          />
          {<p className="text-sm">{errors.money?.message}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="bank">Bank</label>
          <select
            id="bank"
            {...register("bank")}
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

        <button
          type="submit"
          className="self-center rounded-md bg-gray-950 p-2 px-3 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Money"}
        </button>
      </Card>
    </Form>
  );
}
