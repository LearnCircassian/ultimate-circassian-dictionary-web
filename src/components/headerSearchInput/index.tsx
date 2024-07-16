import React from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { cn } from "~/utils/classNames";

interface HeaderSearchInputProps {
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void; // Optional onFocus handler
  className?: string;
  placeholder?: string;
}

export default function HeaderSearchInput({
  value,
  onChange,
  onFocus,
  className,
  placeholder,
}: HeaderSearchInputProps) {
  return (
    <div
      className={cn(
        "mx-auto flex flex-row items-center justify-center ",
        "xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-5/6 w-full",
      )}
    >
      <div
        className={cn(
          "flex flex-row gap-2 items-center justify-center w-full",
          "px-4 py-2 text-black font-medium bg-[#f2f1f4] rounded-lg shadow",
          "2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm",
          className,
        )}
      >
        <FaSearch className="opacity-80" size={20} color="#155e75" />
        <input
          className="w-full bg-transparent font-medium text-black outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus} // Optional onFocus handler passed through
          placeholder={placeholder}
        />
        {value && (
          <button onClick={() => onChange("")} className="flex items-center hover:opacity-80">
            <FaTimesCircle className="opacity-80" size={20} color="#757575" />
          </button>
        )}
      </div>
    </div>
  );
}
