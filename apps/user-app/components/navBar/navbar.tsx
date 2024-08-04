import PaytemHeading from "../paytemHeading";
import NavBtn from "./navBtn";

interface NavbarProp {
  user?: {
    name: string | null;
    email: string | null;
  };
  signin: () => void;
  signout: () => void;
}

export default function Navbar({ user, signin, signout }: NavbarProp) {
  return (
    <nav className="md-px-8 flex justify-between border-b-2 border-slate-400 bg-slate-200 px-4 py-3">
      <PaytemHeading />

      <div className="flex justify-between items-center gap-x-4">
        <h3 className="text-gray-950 text-sm underline">{user?.email}</h3>
        <NavBtn user={user} onClickHandler={user ? signout : signin} />
      </div>
    </nav>
  );
}
