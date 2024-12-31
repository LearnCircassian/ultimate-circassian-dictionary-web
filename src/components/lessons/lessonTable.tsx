import React from "react";
import { cn } from "~/utils/classNames";

interface LessonTableProps {
  headers?: React.ReactNode[]; // Headers for the table
  rows?: React.ReactNode[][]; // Rows data
  footer?: React.ReactNode[]; // Footer for the table
  showIndexes?: boolean; // Whether to show index column
}

export default function LessonTable({
  rows = [],
  showIndexes = false,
  headers = [],
  footer = [],
}: LessonTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      {/* Table Head */}
      <thead className={cn({ hidden: headers.length === 0 })}>
        <tr>
          <th className={cn("bg-[#ed7c31] text-white font-bold", { hidden: !showIndexes })}>#</th>
          {headers.map((header, index) => {
            return (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                {header}
              </th>
            );
          })}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {rows.map((row, rowIndex) => {
          return (
            <tr
              key={rowIndex}
              className={cn("border-2 border-solid text-black", {
                "bg-[#fcece8] border-[#ed7d31]": rowIndex % 2 === 0,
                "bg-[#ebf1e9] border-[#70ad47]": rowIndex % 2 !== 0,
              })}
            >
              {/* Show Index Column */}
              <td
                className={cn("font-bold text-white text-center px-4 py-2 ", {
                  "bg-[#ed7d31]": rowIndex % 2 === 0,
                  "bg-[#70ad47]": rowIndex % 2 !== 0,
                  hidden: !showIndexes,
                })}
              >
                {rowIndex + 1}
              </td>

              {/* Render Row Data */}
              {row.map((cell, cellIndex) => {
                return (
                  <td
                    key={cellIndex}
                    className={cn("border-2 border-solid text-black px-4 py-2", {
                      "bg-[#fcece8] border-[#ed7d31]": rowIndex % 2 === 0,
                      "bg-[#ebf1e9] border-[#70ad47]": rowIndex % 2 !== 0,
                    })}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>

      {/* Table Footer */}
      <tfoot className={cn({ hidden: footer.length === 0 })}>
        <tr>
          {showIndexes && <td></td>}
          {footer.map((footerCell, index) => {
            return (
              <td key={index} className="border px-4 py-2">
                {footerCell}
              </td>
            );
          })}
        </tr>
      </tfoot>
    </table>
  );
}
