interface FormBtnProp {
  className?: string;
  btnText: string;
  type: "button" | "submit";
  isSubmitting?: boolean;
  whiteBtn?: boolean;
  onClick?: () => void;
}

export default function FormBtn({
  className,
  btnText,
  type,
  onClick,
  isSubmitting,
  whiteBtn,
}: FormBtnProp) {
  return (
    <button
      type={type}
      className={`rounded-full border border-blue-500 p-2 text-lg font-medium ${whiteBtn ? "bg-white text-blue-600" : "bg-blue-500 text-white"} ${className}`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : btnText}
    </button>
  );
}
