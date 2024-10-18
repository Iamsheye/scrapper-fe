type GoogleBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const GoogleBtn = ({ onClick }: GoogleBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-[40px] border border-primary p-4"
    >
      <img src="./google.png" alt="" />
      <span className="text-[1rem] font-semibold">continue with google</span>
    </button>
  );
};

export default GoogleBtn;
