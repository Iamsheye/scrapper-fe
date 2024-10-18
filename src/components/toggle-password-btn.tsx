type TogglePasswordBtnProps = {
  showPassword: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const TogglePasswordBtn = ({
  onClick,
  showPassword,
}: TogglePasswordBtnProps) => {
  return (
    <button
      type="button"
      className="absolute right-6 top-1/2 -translate-y-1/2 text-[0.875rem] text-primary underline md:right-8"
      onClick={onClick}
    >
      {showPassword ? "hide" : "show"}
    </button>
  );
};

export default TogglePasswordBtn;
