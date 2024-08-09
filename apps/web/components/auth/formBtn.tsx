interface FormBtnProp {
  className?: string;
  btnText: string;
  isSubmit: boolean;
  isSubmitting?: boolean;
  onClick?: () => void;
}

export default function FormBtn({
  className,
  btnText,
  isSubmit,
  onClick,
  isSubmitting,
}: FormBtnProp) {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`rounded-full border border-blue-500 p-2 text-lg font-medium ${className}`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : btnText}
    </button>
  );
}
