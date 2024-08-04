<<<<<<< HEAD
import { HomeIcon, TransactionsIcon, TransferIcon  , P2PTransferIcon} from "./SVG/sideBaricons";
import SidebarLink from "./sidebarLink";
=======
import {
  HomeIcon,
  TransactionsIcon,
  TransferIcon,
} from "./SVG/SideBarIcons";
import SidebarLink from "./SidebarLink";
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3

export default function Sidebar() {
  return (
    <aside className="flex h-96 flex-col items-center border-r-2 border-slate-400 bg-gray-200 px-8 pt-28 capitalize">
<<<<<<< HEAD
      <div className="w-36">
=======
      <div className="pr-8">
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
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
<<<<<<< HEAD
        <SidebarLink
          href="/dashboard/p2p"
          Icon={<P2PTransferIcon />}
          linkText="P2P Transfer"
        />
=======
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
      </div>
    </aside>
  );
}
