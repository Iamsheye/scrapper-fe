import { useEffect, useRef } from "react";

type DialogModalProps = {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
};

const DialogModal = ({ text, isOpen, onClose, onYes }: DialogModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog?.close();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (!dialogRef.current) return;

    const dialogDimensions = dialogRef.current?.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClickOutside}
      className="w-full max-w-[calc(100vw_-_48px)] rounded-[40px] backdrop:bg-black/25 lg:max-w-[calc(100vw_-_128px)]"
    >
      <div className="flex flex-col items-center justify-between gap-8 bg-form px-6 py-4 md:flex-row lg:p-8">
        <p className="text-[0.875rem] font-semibold text-primary md:text-[1.25rem]">
          {text}
        </p>
        <div className="items center flex shrink-0 gap-6 lg:gap-8">
          <button
            onClick={onYes}
            className="text-[0.875rem] text-primary underline md:text-[1.25rem]"
          >
            yes
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[0.875rem] text-form_text underline md:text-[1.25rem]"
          >
            cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogModal;
