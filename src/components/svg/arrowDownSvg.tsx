import React from "react";
import { GenericSvgProps } from "~/interfaces";

export default function ArrowDownSvg({
  width = "6",
  height = "4",
  className,
  fill = "none",
}: GenericSvgProps) {
  return (
    <svg
      fill={fill}
      height={width}
      width={height}
      className={className}
      viewBox="0 0 6 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.083252 0.833344L2.99992 3.75001L5.91659 0.833344H0.083252Z" fill="#161619" />
    </svg>
  );
}
