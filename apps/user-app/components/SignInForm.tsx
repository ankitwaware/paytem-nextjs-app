"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SIgnInFormData>({
    resolver: zodResolver(SIgnInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmitHandler = async (data: SIgnInFormData) => {
    console.log("SIgnin Form", data);
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        username: email,
        password,
      });
      console.log("sign in res", response);

      if (!response!.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
    } catch (error) {
      console.log(error);
      console.log("Login Failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
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

      <AuthBtn
        isSubmitting={isSubmitting}
        pageType="signin"
        onClickHandler={() => router.push("/signup")}
      />
    </form>
  );
}
