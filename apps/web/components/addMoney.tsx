"use client";
import { Form, useForm, type FormSubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@repo/ui/card";
import { useRouter } from "next/navigation";
import { addMoneySchema, type addMoneyInput } from "./zod/addMoneySchema";
import createOnrampTransaction from "../lib/createOnrampTransaction";

const supportedBanks = [
  { name: "Hdfc Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "Kotak Bank", redirectUrl: "https://www.kotakbank.com/" },
];

export default function AddMoney({ className }: { className?: string }) {
  const {
    clearErrors,
    reset,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<addMoneyInput>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      bank: supportedBanks[0]?.name,
    },
    progressive: true,
  });

  const router = useRouter();

  const onAddMoneyHandler: FormSubmitHandler<addMoneyInput> = async (
    payload,
  ) => {
    const { data } = payload;
    const { bank, amount } = data;
    // redirect url of selected Bank
    // const redirectUrl = supportedBanks.find(
    //   (supp_bank) => supp_bank.name === bank,
    // )?.redirectUrl;
    // window.location.href = redirectUrl || "";
    try {
      // transaction unique token
      const token = (Math.random() * 1000 + 1).toString();
      const NewTxn = await createOnrampTransaction(bank, amount, token);
      const userId = NewTxn.tnx.userId.toString();

      // fake bank api to handle add amount
      const bankUrl = `http://localhost:3001/hdfcwebhook`;
      await fetch(bankUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId,
          amount,
        }),
      });

      // fix Refresh the current page to see successfull transfer
      // router.refresh();

      // reset and clear errors from afert 3sec
      setTimeout(() => {
        clearErrors();
        reset();
        router.refresh();
      }, 3000);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Form
      control={control}
      onSubmit={onAddMoneyHandler}
      className={`${className}`}
    >
      <Card title="Add Moeny" className="h-72 justify-between">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            {...register("amount")}
            type="text"
            placeholder="Amount"
            autoComplete="off"
            className="rounded-md border border-slate-300 p-2"
          />
          <p className="text-sm">{errors.amount?.message}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="bank">Bank</label>
          <select
            id="bank"
            {...register("bank")}
            className="rounded-md border border-slate-300 p-2 capitalize"
          >
            {supportedBanks.map((bank) => {
              return (
                <option defaultValue={bank.name} key={bank.name}>
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
