"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import {
  SIgnupFormData,
  SIgnupFormSchema,
} from "../lib/zodSchema/authFormSchema";
import FormInput from "./formInput";
import AuthBtn from "./signInUpBtn";
import { signUpResBody } from "../app/api/register/route";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const {
    control,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SIgnupFormData>({
    resolver: zodResolver(SIgnupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    progressive: true,
  });

  async function onSuccessHandler({
    response: signUpResponse,
  }: {
    response: Response;
  }) {
    try {
      const Responsebody: signUpResBody = await signUpResponse.json();

      const res = await signIn("credentials", {
        email: Responsebody.data?.email,
        password: Responsebody.data?.password,
        redirect: false,
      });

      if (res?.error) {
        setError("root.serverError", {
          message: "Signin error after succes",
        });
      }

      // if all well
      if (res?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("root.serverError", {
        message: "Signin error after succes",
      });
    }
  }

  async function onErrorHandler(params: any) {
    const { response } = params as { response: Response };

    const Responsebody: signUpResBody = await response.json();

    setError("root.serverError", {
      type: response.status + "",
      message: Responsebody.message,
    });

    if (Responsebody.username) {
      setError("username", {
        message: Responsebody.username.message,
      });
    }
    if (Responsebody.email) {
      setError("email", {
        message: Responsebody.email.message,
      });
    }
    if (Responsebody.password) {
      setError("password", {
        message: Responsebody.password.message,
      });
    }
  }

  const router = useRouter();

  return (
    <Form
      action={"/api/register"}
      control={control}
      method="post"
      // onSubmit={onSubmitHandler} // function to be called before the request
      onSuccess={onSuccessHandler} // valid response
      onError={onErrorHandler} // error response
      headers={{ "Content-Type": "application/json" }}
      validateStatus={(status) => status === 201}
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

      {/* server error message */}
      {errors?.root?.serverError && <p>{errors?.root?.serverError?.message}</p>}

      <AuthBtn
        isSubmitting={isSubmitting}
        pageType="signup"
        onClickHandler={() => router.push("/signin")}
      />
    </Form>
  );
}
