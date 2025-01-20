import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface Props<V extends FieldValues> {
  type: string;
  error?: string;
  place?: string;
  label: Path<V>;
  register: UseFormRegister<V>;
};

export const Field = <V extends FieldValues>({ type, label, place, register, error }: Props<V>): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-white font-semibold">{label}</label>
      <input {...register(label)} type={type} placeholder={place}
        className="outline-none text-black px-2 py-1 rounded-md" />
      { error && <p className="text-red-600">{error}</p> }
    </div>
  );
};