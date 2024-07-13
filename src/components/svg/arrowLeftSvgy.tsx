import React from "react";
import { GenericSvgProps } from "~/interfaces/props";
import { cn } from "~/utils/classNames";

export default function ArrowLeftSvg({
  width = "5",
  height = "8",
  overrideClassName,
  fill = "none",
  isDisabled = false,
  onClick = () => {},
}: GenericSvgProps) {
  return (
    <svg
      fill={fill}
      height={width}
      width={height}
      className={cn({ "opacity-50": isDisabled }, overrideClassName)}
      viewBox="0 0 5 8"
      xmlns="http://www.w3.org/2000/svg"
      onClick={isDisabled ? () => {} : onClick}
    >
      <path d="M4.5 0L0.5 4L4.5 8L4.5 0Z" fill="#161619" />
    </svg>
  );
}
