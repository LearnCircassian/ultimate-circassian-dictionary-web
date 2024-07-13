import React from "react";
import { GenericSvgProps } from "~/interfaces";

export default function IFrameSvg({
  width = "14",
  height = "14",
  overrideClassName,
  fill = "none",
  onClick,
}: GenericSvgProps) {
  return (
    <svg
      height={width}
      width={height}
      className={overrideClassName}
      onClick={onClick}
      viewBox="0 0 14 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="#E6E6E6" strokeOpacity="0.2" />
      <path
        d="M4.84668 5.396H7.72266V9.57568H9.15332V10.6792H4.84668V9.57568H6.35059V6.50439H4.84668V5.396ZM6.25293 4.04346C6.25293 3.93929 6.27083 3.84326 6.30664 3.75537C6.3457 3.66423 6.39941 3.5861 6.46777 3.521C6.53613 3.45915 6.61751 3.41032 6.71191 3.37451C6.80957 3.3387 6.91699 3.3208 7.03418 3.3208C7.27507 3.3208 7.46549 3.38916 7.60547 3.52588C7.7487 3.65934 7.82031 3.83187 7.82031 4.04346C7.82031 4.25505 7.7487 4.4292 7.60547 4.56592C7.46549 4.69938 7.27507 4.76611 7.03418 4.76611C6.91699 4.76611 6.80957 4.74821 6.71191 4.7124C6.61751 4.6766 6.53613 4.62614 6.46777 4.56104C6.39941 4.49919 6.3457 4.42432 6.30664 4.33643C6.27083 4.24528 6.25293 4.14762 6.25293 4.04346Z"
        fill="#E6E6E6"
        fillOpacity="0.2"
      />
    </svg>
  );
}
