import React from "react";
import { cn } from "~/utils/classNames";

export default function ContainerDiv({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto my-16 flex w-11/12 flex-col items-center justify-center gap-2 rounded-sm bg-white py-8 shadow-xl xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
