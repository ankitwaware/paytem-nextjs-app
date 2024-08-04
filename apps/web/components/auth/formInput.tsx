interface FormInputProp {
  type?: string | "text";
  labelText?: string;
  id?: string;
  placeholder: string;
  errorMsg: string | undefined;
  formRegister: any;
  className?: string;
}

export default function FormInput(prop: FormInputProp) {
  return (
    <div className="flex flex-col gap-y-1">
      {prop.labelText && (
        <label className="font-medium" htmlFor={prop.id}>
          {prop.labelText}
        </label>
      )}
      <input
        {...prop.formRegister}
        type={prop.type}
        id={prop.id}
        placeholder={prop.placeholder}
        autoComplete="off"
        className={`rounded-md border border-slate-300 p-2 pl-4 ${prop.className}`}
      />
      {<p className="text-sm">{prop.errorMsg}</p>}
    </div>
  );
}
