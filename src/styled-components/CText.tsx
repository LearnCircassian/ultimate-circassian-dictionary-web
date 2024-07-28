import React, { ReactNode, useState } from "react";
import { cn } from "~/utils/classNames";

const HoverableIPA = ({ word, ipa }: { word: string; ipa: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer"
      >
        {word}
      </span>
      {isHovered && (
        <div className="absolute left-0 rounded border bg-white p-2 shadow-lg">{ipa}</div>
      )}
    </div>
  );
};

function HoverBox({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 rounded border bg-white p-2 shadow-lg">
      {children}
    </div>
  );
}

export default function CText({
  children,
  ipa,
  className,
}: {
  children: ReactNode | ReactNode[];
  ipa?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative">
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn("text-black-500 font-bold", className)}
      >
        {children}
      </span>
      {isHovered && ipa && <HoverBox>{"/" + ipa + "/"}</HoverBox>}
    </span>
  );
}
