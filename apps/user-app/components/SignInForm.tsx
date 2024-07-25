"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  SIgnInFormData,
  SIgnInFormSchema,
} from "../lib/zodSchema/authFormSchema";
import FormInput from "./formInput";
import AuthBtn from "./signInUpBtn";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const {
    control,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SIgnInFormData>({
    resolver: zodResolver(SIgnInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    progressive: true,
  });

  const router = useRouter();

  async function onSubmitHandler({ data }: { data: SIgnInFormData }) {
    console.log("SIgnin Form data", data);
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response!.ok) {
        setError("root.serverError", {
          message: "Please enter valid email/password",
        });
        return response;
      }

      // Process response here
      if (response!.ok) {
        router.push("/");
        return response;
      }
    } catch (error) {
      console.log(error);
      console.log("signIn Failed", error);
    }
  }

  return (
    <Form
      control={control}
      onSubmit={onSubmitHandler}
      headers={{ "Content-Type": "application/json" }}
      validateStatus={(status) => status === 200}
      className="flex flex-col justify-evenly space-y-6 self-stretch"
    >
      <FormInput
        formRegister={register("email")}
        type="email"
        placeholder="Example@email.com"
        errorMsg={errors.email?.message}
      />

      <FormInput
        formRegister={register("password")}
        type="password"
        placeholder="Password"
        errorMsg={errors.password?.message}
      />

      {/* server error message */}
      {errors?.root?.serverError && <p>{errors?.root?.serverError?.message}</p>}

      <AuthBtn
        isSubmitting={isSubmitting}
        pageType="signin"
        onClickHandler={() => router.push("/signup")}
      />
    </Form>
  );
}
