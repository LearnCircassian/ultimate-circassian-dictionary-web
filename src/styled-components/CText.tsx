import React, { ReactNode } from "react";
import { cn } from "~/utils/classNames";

export default function CText({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) {
  return <span className={cn("font-bold text-gray-500", className)}>{children}</span>;
}
