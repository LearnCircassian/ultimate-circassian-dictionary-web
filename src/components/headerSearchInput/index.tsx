import React from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { cn } from "~/utils/classNames";
import { replaceAllPalochkaLettersToOne, replaceAllOneToPalochka } from "~/utils/wordFormatting";

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
  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center",
        "xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-5/6 w-full",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-full",
          "sm:px-4 px-2 py-3 text-black font-medium rounded-lg shadow",
          "3xl:text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg",
          className,
        )}
        style={{
          backgroundColor: "#f2f1f4",
          border: "2px solid #155e75",
        }} // Added border and adjusted background color
      >
        <FaSearch className="opacity-80" size={24} color="#155e75" /> {/* Increased icon size */}
        <input
          className="flex-grow bg-transparent px-1 font-medium text-black outline-none sm:px-2"
          value={value}
          onChange={inputChangeHandler}
          onFocus={onFocus} // Optional onFocus handler passed through
          placeholder={placeholder}
        />
        <button className={cn("flex items-center hover:opacity-80", { hidden: !value })}>
          <FaTimesCircle className="opacity-80" size={24} color="#757575" />{" "}
          {/* Increased icon size */}
        </button>
      </div>
    </div>
  );
}
