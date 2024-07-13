import React from "react";
import { cn } from "~/utils/classNames";
import { NameToTwitter } from "~/interfaces";

interface CustomTableProps {
  rowItems: NameToTwitter[];
}

export default function DiscoverTable({ rowItems }: CustomTableProps) {
  return (
    <div className={cn("flex flex-col w-[300px]")}>
      <HeaderCells />
      <RowCells rowItems={rowItems} />
    </div>
  );
}

function HeaderCells() {
  const headerItems = ["Name", "Twitter/X"];
  const firstCellClass = "border border-solid rounded-tl-[4px] border-white/40";
  const middleCellClass = "border-y border-solid border-white/40";
  const lastCellClass = "border border-solid rounded-tr-[4px] border-white/40";

  return (
    <div className="flex w-full flex-row items-center justify-center gap-px">
      {headerItems.map((v, idx) => {
        return (
          <div
            key={idx}
            className={cn("flex-1 items-center p-2 text-xs font-medium text-white bg-black", {
              [firstCellClass]: idx === 0,
              [middleCellClass]: 0 < idx && idx < headerItems.length - 1,
              [lastCellClass]: idx === headerItems.length - 1,
            })}
          >
            {v}
          </div>
        );
      })}
    </div>
  );
}

function RowCells({ rowItems }: { rowItems: NameToTwitter[] }) {
  if (rowItems.length === 0) {
    return (
      <div className="flex grow items-center justify-center py-3 text-center text-sm font-medium text-white/50">
        No items.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-px">
      {rowItems.map((r, rowIdx) => {
        const colItems = [r.userName, r.twitterName];
        return (
          <div key={rowIdx} className="flex w-full flex-row">
            {colItems.map((c, colIdx) => {
              return (
                <div
                  key={colIdx}
                  className={cn("flex-1 p-2 w-full text-twitter font-medium text-left")}
                >
                  {c}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
