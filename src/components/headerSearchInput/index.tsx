import React from "react";
import { cn } from "~/utils/classNames";
import MagnifyingGlassSvg from "~/components/svg/magnifyingGlassSvg";

interface HeaderSearchInputProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}

export default function HeaderSearchInput({
  value,
  onChange,
  className,
  placeholder,
}: HeaderSearchInputProps) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 bg-transparent items-center justify-start mx-auto w-full",
        "bg-[#343438] rounded-[12px] px-4 py-2 my-2 text-[#757575] font-medium",
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
        className="w-full bg-transparent font-medium text-white placeholder-[#757575]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
