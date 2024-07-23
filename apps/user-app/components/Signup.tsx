import { getServerSession } from "next-auth";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession();
  // if user redirect to homePage
  if (session?.user) redirect("/");

  return (
    <section className="bg-white h-screen grid place-items-center">
      <div className="w-3/4 text-black border border-grey-400 rounded-xl flex flex-col justify-between items-center p-8 gap-y-5">
        <h1 className="text-4xl font-extrabold text-blue-500 italic">Paytem</h1>
        <h2 className="text-2xl font-semibold">Create Account</h2>
        <SignUpForm />
      </div>
    </section>
  );
}
