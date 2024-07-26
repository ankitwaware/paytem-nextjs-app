"use client";

import { useSession } from "next-auth/react";
import LandingPage from "../pages/landingPage";
import { redirect } from "next/navigation";

export default function Page(): React.JSX.Element {
  const { data: session, status } = useSession();

  if (status == "unauthenticated") {
    redirect("/signin");
  }

  return <LandingPage />;
}
