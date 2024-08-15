"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { type SIgnupFormData, SIgnupFormSchema } from "./zod/authFormSchema";
import { type SignUpResBody } from "../app/api/register/route";
import FormInput from "./formInput";
import FormBtn from "./formBtn";

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
      number: "",
    },
    progressive: true,
  });

  async function onSuccessHandler({
    response: signUpResponse,
  }: {
    response: Response;
  }) {
    try {
      const Responsebody = (await signUpResponse.json()) as SignUpResBody;

      // after successfull signup, signin user
      const res = await signIn("credentials", {
        email: Responsebody.data?.email,
        password: Responsebody.data?.password,
        redirect: false,
      });

      if (res?.error) {
        setError("root", {
          message: "Signin error after succes",
        });
      }

      // if all well
      if (res?.ok) {
        router.push("/");
      }
    } catch (error) {
      setError("root", {
        message: "Signin error after succes",
      });
    }
  }

  type OnErrorProp =
    | {
        response: Response;
        error?: undefined;
      }
    | {
        response?: undefined;
        error: unknown;
      };

  async function onErrorHandler({ response }: OnErrorProp) {
    const Responsebody = (await response?.json()) as SignUpResBody;

    setError("root", {
      type: String(response?.status),
      message: Responsebody.message,
    });

    if (Responsebody.username) {
      setError("username", {
        message: Responsebody.username.message,
      });
    }
    if (Responsebody.number) {
      setError("number", {
        message: Responsebody.number.message,
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
      action="/api/register"
      control={control}
      method="post"
      onSuccess={onSuccessHandler} // valid response
      onError={onErrorHandler} // error response
      headers={{ "Content-Type": "application/json" }}
      validateStatus={(status) => status === 201}
      className="flex flex-col justify-evenly space-y-3 self-stretch"
    >
      <FormInput
        formRegister={register("username")}
        placeholder="Username"
        errorMsg={errors.username?.message}
      />

      <FormInput
        formRegister={register("number")}
        placeholder="Phone Number"
        errorMsg={errors.number?.message}
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

      {/* root server error message */}
      <p className="text-sm">{errors.root?.message}</p>

      <FormBtn
        isSubmit
        btnText="SIgnUp"
        isSubmitting={isSubmitting}
        className="bg-blue-600 text-white"
      />

      <FormBtn
        isSubmit={false}
        btnText="SIgnIn"
        className="text-blue-600"
        onClick={() => {
          router.push("/signin");
        }}
      />
    </Form>
  );
}
