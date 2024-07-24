interface FormInputProp {
  type: string;
  placeholder: string;
  errorMsg: string | undefined;
  formRegister: any;
}

export default function FormInput(prop: FormInputProp) {
  return (
    <div className="flex flex-col">
      <input
        {...prop.formRegister}
        type={prop.type}
        placeholder={prop.placeholder}
        autoComplete="off"
        className="p-2.5 border border-slate-300  rounded-md"
      />
      {<p className="text-sm">{prop.errorMsg}</p>}
    </div>
  );
}
