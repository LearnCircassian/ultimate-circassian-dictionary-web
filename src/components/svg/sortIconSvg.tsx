import React from "react";
import { GenericSvgProps } from "~/interfaces";

export default function SortIconSvg({
  width = "18",
  height = "18",
  className,
  fill = "#000000",
  onClick,
}: GenericSvgProps) {
  return (
    <svg
      fill={fill}
      height={width}
      width={height}
      className={className}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 8"
      onClick={onClick}
    >
      <path
        d="M1.5 1.5H10.5M3 4H9M5 6.5H7"
        stroke="#161619"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
