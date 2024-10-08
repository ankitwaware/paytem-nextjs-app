"use client";

import Card from "@repo/ui/card";
import { Form, type FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./formInput";
import FormBtn from "./formBtn";
import {
  PerToPerInputType,
  PerToPerInputSchema,
} from "./zod/personToPersonSchema";
import p2pTransferAction from "../lib/p2pTransfer";

export default function PerToPerTranferForm() {
  const {
    control,
    register,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PerToPerInputType>({
    resolver: zodResolver(PerToPerInputSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
  });

  const onSubmitHandler: FormSubmitHandler<PerToPerInputType> = async (
    payload,
  ) => {
    const { amount, phoneNumber } = payload.data;

    const token = (Math.random() * 1000 + 1).toString();
    const response = await p2pTransferAction(phoneNumber, amount, token);

    if (response.message) {
      setError("root", {
        message: response.message,
      });

      if (response.amount) {
        setError("amount", {
          message: response.amount.message,
        });
      }
      if (response.phoneNumber) {
        setError("phoneNumber", {
          message: response.phoneNumber.message,
        });
      }
    }

    // reset and clear errors from afert 3sec
    if (response.type === "done") {
      setTimeout(() => {
        clearErrors();
        reset();
      }, 3000);
    }
  };

  return (
    <Form
      control={control}
      onSubmit={onSubmitHandler}
      className="flex h-96 items-center"
    >
      <Card title="send" className="size-80 justify-between">
        <FormInput
          formRegister={register("phoneNumber")}
          placeholder="Phone Number"
          errorMsg={errors.phoneNumber?.message}
          labelText="Phone Number"
          id="PhoneNumber"
        />
        <FormInput
          formRegister={register("amount")}
          placeholder="amount"
          errorMsg={errors.amount?.message}
          labelText="Amount"
          id="amount"
        />
        {/* server error message */}
        <p className="text-sm">{errors.root?.message}</p>

        <FormBtn
          isSubmit
          btnText="Send Money"
          isSubmitting={isSubmitting}
          className="border-none bg-gray-900 px-3 text-sm text-white"
        />
      </Card>
    </Form>
  );
}
