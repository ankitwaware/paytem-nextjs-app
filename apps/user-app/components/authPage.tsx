import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

type authPageProp = {
  pageType: "signin" | "signup";
};

export default async function AuthPage({ pageType }: authPageProp) {
  // TODO add redirect to home page after user session
  const session = await getServerSession();

  if (session?.user?.email) redirect("/");

  return (
    <section className="bg-white h-screen grid place-items-center">
      <div className="w-3/4 text-black border border-grey-400 rounded-xl flex flex-col justify-between items-center p-8 gap-y-5">
        <h1 className="text-4xl font-extrabold text-blue-500 italic">Paytem</h1>
        <h2 className="text-2xl font-semibold">
          {pageType == "signin" ? "Signin" : "Signup"}
        </h2>
        {pageType == "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </section>
  );
}
