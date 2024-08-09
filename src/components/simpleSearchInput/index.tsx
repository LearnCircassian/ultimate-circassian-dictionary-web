import React from "react";
import { cn } from "~/utils/classNames";
import MagnifyingGlassSvg from "~/components/svg/magnifyingGlassSvg";

interface SimpleSearchInputProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SimpleSearchInput({
  value,
  onChange,
  className,
  placeholder,
}: SimpleSearchInputProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-start gap-2 rounded-[8px] bg-[#343438] bg-transparent p-2",
        className,
      )}
    >
      <input
        className="w-full bg-transparent font-medium text-white placeholder-[#757575]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
