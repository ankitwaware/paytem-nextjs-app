import {
  HomeIcon,
  TransactionsIcon,
  TransferIcon,
} from "./SVG/SideBarIcons";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <aside className="flex h-96 flex-col items-center border-r-2 border-slate-400 bg-gray-200 px-8 pt-28 capitalize">
      <div className="pr-8">
        <SidebarLink href="/dashboard" Icon={<HomeIcon />} linkText="home" />
        <SidebarLink
          href="/dashboard/transfer"
          Icon={<TransferIcon />}
          linkText="transfer"
        />
        <SidebarLink
          href="/dashboard/transaction"
          Icon={<TransactionsIcon />}
          linkText="transaction"
        />
      </div>
    </aside>
  );
}
