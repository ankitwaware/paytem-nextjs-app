import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export default async function Signin() {
  // if  session
  const session = await getServerSession();
  
  // redirect to homePage
  if (session) {
    console.log(session);
    redirect("/");
  }

  return (
    <section className="bg-white h-screen grid place-items-center">
      <div className="h-3/5 w-2/3 text-black  border border-grey-400 rounded-xl flex flex-col">
        <h2>Paytem</h2>
        <h4>SignUp</h4>
        <SignInForm />
      </div>
    </section>
  );
}
