import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps<FormData extends FieldValues>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: Path<FormData>;
  register?: UseFormRegister<FormData>;
  errors?: FieldErrors<FormData>;
  showPassword?: boolean;
  onToggleClick?: () => void;
}

export const Input = <FormData extends FieldValues>({
  name,
  register,
  errors,
  type,
  showPassword,
  onToggleClick,
  ...rest
}: InputProps<FormData>) => {
  const error = errors?.[name]?.message as string | undefined;

  const inputType = showPassword ? "text" : type;

  return (
    <>
      <div className="relative">
        <input
          type={inputType}
          className="h-[48px] w-full rounded-[24px] bg-form px-6 py-4 text-[0.875rem] font-semibold text-primary focus-visible:outline-form_text md:h-[88px] md:rounded-[40px] md:p-8 md:text-[1.25rem]"
          {...rest}
          {...register?.(name)}
        />
        {onToggleClick && (
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[0.875rem] text-primary underline md:right-8"
            onClick={onToggleClick}
          >
            {showPassword ? "hide" : "show"}
          </button>
        )}
      </div>
      {error && (
        <span className="ml-[12px] mt-1.5 inline-block text-[0.75rem] text-red-500 md:ml-[20px]">
          {error}
        </span>
      )}
    </>
  );
};

export default Input;
