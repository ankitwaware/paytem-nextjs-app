import SidebarLink from "./sidebarLink";
import {
  HomeIcon,
  TransactionsIcon,
  TransferIcon,
  P2PTransferIcon,
} from "./SVG/sideBarIcons";

export default function Sidebar() {
  return (
    <aside className="flex h-96 flex-col items-center border-r-2 border-slate-400 bg-gray-200 px-8 pt-28 capitalize">
      <div className="w-36">
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
        <SidebarLink
          href="/dashboard/p2p"
          Icon={<P2PTransferIcon />}
          linkText="P2P Transfer"
        />
      </div>
    </aside>
  );
}
