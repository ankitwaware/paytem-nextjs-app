import { ReactNode } from "react";
import DashboardLayout from "../../components/dashboardLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return  <DashboardLayout children={children} />;
}
