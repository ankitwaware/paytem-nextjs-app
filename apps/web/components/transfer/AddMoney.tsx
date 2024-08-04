"use client";
<<<<<<< Updated upstream
<<<<<<< HEAD
import Card from "@repo/ui/card";
=======
import Card from "@repo/ui/Card";
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
import Card from "@repo/ui/card";
>>>>>>> Stashed changes

import { addMoneySchema, addMoneyInput } from "../../schema/addMoneySchema";
import { Form, useForm, FormSubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOnrampTransaction } from "../../lib/actions/createOnrampTransaction";

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
      bank: supported_banks[0]?.name,
    },
    progressive: true,
  });

  const onAddMoneyHandler: FormSubmitHandler<addMoneyInput> = async (
    payload,
  ) => {
    const { data } = payload;
<<<<<<< Updated upstream
<<<<<<< HEAD
    console.log(data);
=======
    console.log(data)
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
    console.log(data);
>>>>>>> Stashed changes

    const { bank, amount } = data;
    // redirect url of selected Bank
    // const redirectUrl = supported_banks.find(
    //   (supp_bank) => supp_bank.name === bank,
    // )?.redirectUrl;
<<<<<<< Updated upstream
<<<<<<< HEAD
    // window.location.href = redirectUrl || "";
=======
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
    // window.location.href = redirectUrl || "";
>>>>>>> Stashed changes

    try {
      // transaction unique token
      const token = (Math.random() * 1000 + 1).toString();
<<<<<<< Updated upstream
<<<<<<< HEAD
      const bankUrl = "http://localhost:8080/hdfcwebhook";

      const NewTxn = await createOnrampTransaction(bank, amount, token);
      const userId = NewTxn.tnx.userId.toString();

      // fake bank api to handle add amount
=======
=======
      const bankUrl = "http://localhost:8080/hdfcwebhook";
>>>>>>> Stashed changes

      const NewTxn = await createOnrampTransaction(bank, amount, token);
      const userId = NewTxn.tnx.userId.toString();

      // fake bank api to handle add amount
<<<<<<< Updated upstream
      const bankUrl = `http://localhost:8080/hdfcwebhook`;
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
>>>>>>> Stashed changes
      fetch(bankUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
<<<<<<< Updated upstream
<<<<<<< HEAD
          userId: userId,
          amount: amount,
        }),
      });
=======
          userId: NewTxn.tnx?.userId?.toString(),
          amount: amount,
        }),
      });

>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
          userId: userId,
          amount: amount,
        }),
      });
>>>>>>> Stashed changes
    } catch (error) {
      console.log(error);
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
          {<p className="text-sm">{errors.amount?.message}</p>}
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
