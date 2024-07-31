import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm  from "../components/auth/SignUpForm";
import SignInForm  from "../components/auth/SignInForm";

type authPageProp = {
  pageType: "signin" | "signup";
};

export default async function AuthPage({ pageType }: authPageProp) {
  const session = await getServerSession();
  if (session?.user?.email) redirect("/dashboard");

  return (
    <section className="grid h-screen place-items-center bg-white">
      <div className="border-grey-400 flex w-3/4 flex-col items-center justify-between gap-y-4 rounded-xl border px-8 py-4 text-black md:w-2/4 lg:w-1/3">
        <h1 className="text-4xl font-extrabold italic text-blue-500">Paytem</h1>
        <h2 className="text-2xl font-semibold">
          {pageType == "signin" && "Signin"}
          {pageType == "signup" && "Signup"}
        </h2>
        {/* {pageType == "signin" ? <SignInForm /> : <SignUpForm />} */}
        {pageType == "signin" && <SignInForm />}
        {pageType == "signup" && <SignUpForm />}
      </div>
    </section>
  );
}
