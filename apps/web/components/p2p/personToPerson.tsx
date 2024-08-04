"use client";

import Card from "@repo/ui/card";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import FormInput from "../auth/formInput";
import FormBtn from "../auth/formBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import PerToPerInputSchema, {
  PerToPerInputType,
} from "../../schema/personTopersonSchema";
import p2pTransferAction from "../../lib/actions/p2pTransfer";

export default function PersonToPerson() {
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
    progressive: true,
  });

  const onSubmitHandler: FormSubmitHandler<PerToPerInputType> = async (
    payload,
  ) => {
    const { amount, phoneNumber } = payload.data;
    const response = await p2pTransferAction(phoneNumber, amount);

    if (response?.message) {
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

    // reset and clear errors afert 3sec
    if (response.type == "done") {
      setTimeout(() => {
        clearErrors();
        reset();
      }, 5000);
    }
  };

  return (
    <Form
      control={control}
      onSubmit={onSubmitHandler}
      headers={{ "Content-Type": "application/json" }}
      className="flex h-96 items-center justify-center"
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
        {errors?.root?.message && (
          <p className="text-sm">{errors?.root?.message}</p>
        )}
        <FormBtn
          type="submit"
          btnText="Send Money"
          isSubmitting={isSubmitting}
          className="border-none bg-gray-900 px-3 text-sm text-white"
        />
      </Card>
    </Form>
  );
}
