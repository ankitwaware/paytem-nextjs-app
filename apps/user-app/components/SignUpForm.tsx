"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SIgnupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type SIgnupFormData = z.infer<typeof SIgnupFormSchema>;

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
      <div className="flex flex-col">
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          autoComplete="off"
          className="p-2.5 border border-slate-300  rounded-md"
        />
        {
          <p className="text-sm">
            {errors.username?.message}
          </p>
        }
      </div>
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
        {isSubmitting ? "Creating..." : "Sign up"}
      </button>
    </form>
  );
}
