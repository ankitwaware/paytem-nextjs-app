interface FormInputProp {
  type?: string | "text";
  placeholder: string;
  errorMsg: string | undefined;
  formRegister: any;
  className?:string;
}

export default function FormInput(prop: FormInputProp) {
  return (
    <div className="flex flex-col">
      <input
        {...prop.formRegister}
        type={prop.type}
        placeholder={prop.placeholder}
        autoComplete="off"
        className={`p-2 pl-4 border border-slate-300  rounded-md ${prop.className}`}
      />
      {<p className="text-sm">{prop.errorMsg}</p>}
    </div>
  );
}
