import React from "react";
import { cn } from "~/utils/classNames";

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
        "flex flex-row gap-2 bg-transparent items-center justify-start w-full bg-[#343438] rounded-[8px] p-2",
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
