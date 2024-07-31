interface FormBtnProp {
  className?: string;
  btnText: string;
  type: "button" | "submit";
  isSubmitting?: boolean;
  onClick?: () => void;
}

export default function FormBtn({
  className,
  btnText,
  type,
  onClick,
  isSubmitting,
}: FormBtnProp) {
  return (
    <button
      type={type}
      className={`rounded-full border border-blue-500 p-2 text-lg font-medium ${className}`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : btnText}
    </button> 
  );
}
