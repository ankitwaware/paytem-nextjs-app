"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <section className="grid h-screen place-items-center bg-white">
      <div className="border-grey-400 flex w-3/4 flex-col items-center justify-between gap-y-4 rounded-xl border px-8 py-4 text-black md:w-2/4 lg:w-1/3">
        <h1 className="text-4xl font-extrabold italic text-blue-500">Paytem</h1>
        <h2 className="text-2xl font-semibold">
          {pathname === "signin" && "Signin"}
          {pathname === "signup" && "Signup"}
        </h2>
        {/* signin or signup form */}
        {children}
      </div>
    </section>
  );
}
