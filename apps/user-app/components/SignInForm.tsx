"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const SIgnInFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type SIgnInFormData = z.infer<typeof SIgnInFormSchema>;

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
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col justify-evenly space-y-6 self-stretch">
      <div className="flex flex-col">
        <input
          {...register("email")}
          type="email"
          placeholder="Example@email.com"
          autoComplete="off"
          className="p-2.5 border border-slate-300  rounded-md"
        />
        {
          <p className="text-sm">
            {errors.email?.message}
          </p>
        }
      </div>
      <div className="flex flex-col">
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          className="p-2.5 border border-slate-300  rounded-md"
        />
        {
          <p className="text-sm">
            {errors.password?.message}
          </p>
        }
      </div>
      <button
        type="submit"
        className="border border-blue-500 py-2.5 text-blue-500 rounded-full text-xl font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Sign In"}
      </button>
    </form>
  );
}
