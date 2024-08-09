interface NavBtnProp {
  user?: {
    name?: string | null;
  };
  onClickHandler: () => void;
}

export default function NavBtn({ user, onClickHandler }: NavBtnProp) {
  return (
    <button
      type="button"
      className="rounded-md border border-black bg-gray-950 p-1 px-3 capitalize text-white"
      onClick={onClickHandler}
    >
      {user ? "signout" : "login"}
    </button>
  );
}
