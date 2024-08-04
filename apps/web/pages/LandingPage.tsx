"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default  function LandingPage() {
  const session = useSession();

  if (session.data?.user) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }

  return <main>landingPage</main>;
}
