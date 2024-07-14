import React from "react";
import { cn } from "~/utils/classNames";
import MagnifyingGlassSvg from "~/components/svg/magnifyingGlassSvg";

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
        "flex flex-row gap-2 bg-transparent items-center justify-start mx-auto w-full",
        "bg-white rounded-sm px-4 py-2 my-2 text-black font-medium",
        "2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm",
        className,
      )}
    >
      <MagnifyingGlassSvg
        overrideClassName="opacity-50"
        width={"20"}
        height={"20"}
        fill="#757575"
      />
      <input
        className="w-full bg-transparent font-medium text-black outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus} // Optional onFocus handler passed through
        placeholder={placeholder}
      />
    </div>
  );
}
