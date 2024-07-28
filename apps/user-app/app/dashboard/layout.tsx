import { ReactNode } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-slate-200">
      <Sidebar />
      {children}
    </div>
  );
}
