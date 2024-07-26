type AuthBtnProp = {
  pageType: "signin" | "signup";
  isSubmitting: boolean;
  onClickHandler: () => void;
};

export default function AuthBtn({
  pageType,
  isSubmitting,
  onClickHandler,
}: AuthBtnProp) {

  let btnText = "";
  if (pageType == "signin") btnText = "SignIn";
  if (pageType == "signup") btnText = "SignUp";

  return (
    <div className="flex flex-col">
      <button
        type="submit"
        className="rounded-full border border-blue-500 py-2.5 text-xl font-semibold text-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting..." : btnText}
      </button>

      {/* Navigation to other page */}
      <p className="self-center">
        {pageType == "signin" && <span>Create an account</span>}
        {pageType == "signup" && <span>Already have an account</span>}
        <button
          type="button"
          onClick={onClickHandler}
          className="ml-2 underline"
        >
          {pageType == "signin" ? "SignUp" : "SignIn"}
        </button>
      </p>
    </div>
  );
}
