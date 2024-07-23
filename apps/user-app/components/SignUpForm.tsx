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
    formState: { errors },
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
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div>
        <label htmlFor="username">username</label>
        <input
          {...register("username")}
          id="username"
          type="text"
          className="border-2"
        />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="border-2"
        />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="border-2"
        />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
