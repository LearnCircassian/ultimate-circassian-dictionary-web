import React from "react";
import { GenericSvgProps } from "~/interfaces";
import { cn } from "~/utils/classNames";

export default function ArrowRightSvg({
  width = "5",
  height = "8",
  className,
  fill = "none",
  isDisabled = false,
  onClick = () => {},
}: GenericSvgProps) {
  return (
    <svg
      fill={fill}
      height={width}
      width={height}
      className={cn({ "opacity-50": isDisabled }, className)}
      viewBox="0 0 5 8"
      xmlns="http://www.w3.org/2000/svg"
      onClick={isDisabled ? () => {} : onClick}
    >
      <path d="M0.5 8L4.5 4L0.500001 0L0.5 8Z" fill="#161619" />
    </svg>
  );
}
