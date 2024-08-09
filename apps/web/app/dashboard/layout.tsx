import type { ReactNode } from "react";
import Sidebar from "../../components/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-slate-200">
      <Sidebar />
      {children}
    </div>
  );
}
