import React, { ReactNode } from "react";
import { cn } from "~/utils/classNames";

export default function H1({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) {
  return <h1 className={cn("text-3xl xl:text-4xl 2xl:text-5xl", className)}>{children}</h1>;
}
