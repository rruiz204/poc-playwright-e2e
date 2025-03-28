import { FormatHelper } from "@core/helpers/FormatHelper";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface Props<V extends FieldValues> {
  type: string;
  error?: string;
  place?: string;
  label: Path<V>;
  register: UseFormRegister<V>;
};

export const Field = <V extends FieldValues>({ type, label, place, register, error }: Props<V>): JSX.Element => {
  const capitalized = FormatHelper.capitalize(label);

  return (
    <div test-id="field" className="flex flex-col gap-2 flex-1">
      <label test-id="field-label" className="text-white font-semibold">{capitalized}</label>

      <input {...register(label)} type={type} placeholder={place}
        test-id="field-input" className="outline-none text-black px-2 py-1 rounded-md" />

      { error && <p test-id="field-error" className="text-red-600">{error}</p> }
    </div>
  );
};