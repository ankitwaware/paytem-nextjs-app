"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SIgnupFormData,
  SIgnupFormSchema,
} from "../lib/zodSchema/authFormSchema";
import FormInput from "./formInput";
import AuthBtn from "./signInUpBtn";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SIgnupFormData>({
    resolver: zodResolver(SIgnupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmitHandler = async (data: SIgnupFormData) => {
    console.log("Submitting form", data);

    const { username, email, password } = data;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("SIgn Up Res", response);

      // Process response here
      console.log("Registration Successful", response);
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col justify-evenly space-y-6 self-stretch"
    >
      <FormInput
        formRegister={register("username")}
        type="text"
        placeholder="Username"
        errorMsg={errors.username?.message}
      />

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
        pageType="signup"
        onClickHandler={() => router.push("/signin")}
      />
    </form>
  );
}
