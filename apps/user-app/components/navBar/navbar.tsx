import PaytemHeading from "../PaytemHeading";
import NavBtn from "./navBtn";

interface NavbarProp {
  user?: {
    name?: string | null;
  };
  signin: () => void;
  signout: () => void;
}

export default function Navbar({ user, signin, signout }: NavbarProp) {
  return (
    <nav className="md-px-8 flex justify-between border-b border-black bg-gray-200 px-4 py-3">
      <PaytemHeading />

      <div className="flex justify-between gap-x-4 capitalize">
        <NavBtn user={user} onClickHandler={user ? signout : signin} />
      </div>
    </nav>
  );
}
