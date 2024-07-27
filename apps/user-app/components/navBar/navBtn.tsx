interface navBtnProp {
  user?: {
    name?: string | null;
  };
  onClickHandler: () => void;
}

export default function NavBtn({ user, onClickHandler }: navBtnProp) {
  return (
    <button
      className="rounded-md border border-black p-1 px-3 capitalize"
      onClick={onClickHandler}
    >
      {user ? "signout" : "login"}
    </button>
  );
}
