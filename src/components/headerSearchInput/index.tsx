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
        "flex flex-row gap-2 bg-transparent items-center justify-start",
        "bg-[#343438] rounded-[12px] px-3 py-[8px] text-[#757575] font-medium text-md",
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
