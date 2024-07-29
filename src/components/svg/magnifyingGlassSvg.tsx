import React from "react";
import { GenericSvgProps } from "~/interfaces";

export default function MagnifyingGlassSvg({
  width = "18",
  height = "18",
  className,
  fill = "#000000",
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
      viewBox="0 0 490.4 490.4"
    >
      <g>
        <path
          d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
    s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"
        />
      </g>
    </svg>
  );
}
