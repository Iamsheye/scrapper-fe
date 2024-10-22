import { useState } from "react";
import Trash from "@/assets/trash.svg?react";

type TagInputProps = {
  name: string;
  placeholder: string;
  tagList: string[];
  onClearAll: () => void;
  onEnter: (text: string) => void;
  onTagRemove: (text: string) => void;
};

const TagInput = ({
  name,
  placeholder,
  tagList,
  onClearAll,
  onEnter,
  onTagRemove,
}: TagInputProps) => {
  const [text, setText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!text) return;
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(text);
      setText("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      onEnter(text);
      setText("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name={name}
          value={text}
          placeholder={placeholder}
          className="h-[48px] w-full rounded-[24px] bg-form px-6 py-4 text-[0.875rem] font-semibold text-primary focus-visible:outline-form_text md:h-[88px] md:rounded-[40px] md:p-8 md:text-[1.25rem]"
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" style={{ display: "none" }} aria-hidden="true">
          Submit
        </button>
        {tagList?.length > 0 && (
          <button
            type="button"
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-2xl bg-[#e2ded2] p-2 text-[0.75rem] text-primary"
            onClick={onClearAll}
          >
            {/* <Trash className="h-4 w-4" /> */}
            <span>clear all</span>
          </button>
        )}
      </form>
      <div className="flex flex-wrap gap-2 px-2">
        {tagList?.map((word, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 rounded-[24px] border-form_text bg-[#e2ded2] px-3 py-1.5 text-[0.75rem] font-semibold text-primary md:px-4 md:py-2.5 md:text-[0.875rem]"
          >
            {word}
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => onTagRemove(word)}
            >
              <Trash className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
