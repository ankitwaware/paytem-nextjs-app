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
  return (
    <div className="flex flex-col ">
      <button
        type="submit"
        className="border border-blue-500 py-2.5 text-blue-500 rounded-full text-xl font-semibold"
        disabled={isSubmitting}
      >
        {!isSubmitting && pageType == "signin" ? "SignIn" : "SignUp"}
        {isSubmitting && "submitting..."}
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
