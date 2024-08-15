"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  type SIgnInFormData,
  SIgnInFormSchema,
} from "../schema/authFormSchema";
import FormInput from "./formInput";
import FormBtn from "./formBtn";

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
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        setError("root.serverError", {
          message: "Please enter valid email/password",
        });
        return response;
      }

      // Process response here
      router.push("/");
      return response;
    } catch (error) {
      return Response.json(
        { message: "Something Went Wrong.Try Again" },
        { status: 500 },
      );
    }
  }

  return (
    <Form
      control={control}
      onSubmit={onSubmitHandler}
      headers={{ "Content-Type": "application/json" }}
      validateStatus={(status) => status === 200}
      className="flex flex-col justify-evenly space-y-3 self-stretch"
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
      <p className="text-sm">{errors.root?.serverError?.message}</p>

      <FormBtn
        isSubmit
        btnText="SignIn"
        isSubmitting={isSubmitting}
        className="bg-blue-600 text-white"
      />

      <FormBtn
        isSubmit={false}
        btnText="SignUp"
        onClick={() => {
          router.push("/signup");
        }}
        className="text-blue-600"
      />
    </Form>
  );
}
