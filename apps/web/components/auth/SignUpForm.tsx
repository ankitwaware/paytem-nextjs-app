"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import {
  SIgnupFormData,
  SIgnupFormSchema,
} from "../../schema/authFormSchema";
import FormInput from "./formInput";
import { signUpResBody } from "../../app/api/register/route";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
      const Responsebody: signUpResBody = await signUpResponse.json();

      // after successfull signup, signin user
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
      action={"/api/register"}
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

      {/* server error message */}
      {errors?.root?.serverError && (
        <p className="text-sm">{errors?.root?.serverError?.message}</p>
      )}

      <FormBtn
        type="submit"
        btnText="SIgnUp"
        isSubmitting={isSubmitting}
        className="bg-blue-600 text-white"
      />

      <FormBtn
        type="button"
        btnText="SIgnIn"
        className="text-blue-600"
        onClick={() => router.push("/signin")}
      />

      {/* <hr className="h-0.5 bg-black" />

      <FormBtn type="button" btnText="SIgnUp with google" whiteBtn={true} />

      <FormBtn type="button" btnText="SIgnUp with github" whiteBtn={true} /> */}
    </Form>
  );
}
