import React, { ReactNode, useState } from "react";
import { cn } from "~/utils/classNames";

function HoverBox({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 rounded border bg-white p-2 shadow-lg">
      {children}
    </div>
  );
}

export function TranslateText({ children }: { children: ReactNode }) {
  return <span className="text-black-500">{children}</span>;
}

export function HighlightText({ children }: { children: ReactNode }) {
  return <span className="font-bold text-blue-500">{children}</span>;
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
