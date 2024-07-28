import { cn } from "~/utils/classNames";
import React from "react";
import ArrowLeftSvg from "~/components/svg/arrowLeftSvgy";
import ArrowRightSvg from "~/components/svg/arrowRightSvg";
import { countSubstringLoop } from "~/utils/string";
import Dropdown, { LabeledValue } from "~/components/dropdown";
import SortIconSvg from "~/components/svg/sortIconSvg";

export type CellItem = string | number | React.ReactNode;
export type LabelWithIndex = { index: number; label: string };

export interface HeaderItem {
  label: string;
  isSortable?: boolean;
  isAscending?: boolean;
}

function isColumnAllocationSizeClassNameValid(str: string, numberOfItems: number) {
  if (!str) {
    return false;
  }
  if (!str.startsWith("grid-cols-")) {
    return false;
  }
  if (numberOfItems !== countSubstringLoop(str, "_") + 1) {
    return false;
  }
  return numberOfItems === countSubstringLoop(str, "fr");
}

interface TableProps {
  columnAllocationSizeClassName: string;
  headers: HeaderItem[];
  cellItems: CellItem[][];
  isOnDarkMode?: boolean;
  showPagination?: boolean;
  onRowClick?: (rowIndex: number) => void;
  headerRowClassName?: string;
  rowClassName?: string;
}

interface TableWithPaginationProps extends TableProps {
  totalNumberOfItems: number;
  page: number;
  onPageChange: (page: number) => void;
  sizeOfPage: number;
  onSizeOfPageChange: (sizeOfPage: number) => void;
  onHeaderCellSortIconClick?: (clickedHeaderCell: LabelWithIndex) => void;
}

export function TableWithoutPagination(props: TableProps) {
  return (
    <TableWithPagination
      {...props}
      showPagination={false}
      totalNumberOfItems={props.cellItems.length}
      page={1}
      onPageChange={() => {}}
      onSizeOfPageChange={() => {}}
      sizeOfPage={20}
    />
  );
}

export default function TableWithPagination({
  headers,
  columnAllocationSizeClassName,
  cellItems,
  isOnDarkMode = false,
  showPagination = true,
  onRowClick,
  headerRowClassName,
  rowClassName,
  totalNumberOfItems,
  page,
  onPageChange,
  sizeOfPage,
  onSizeOfPageChange,
  onHeaderCellSortIconClick,
}: TableWithPaginationProps) {
  if (!isColumnAllocationSizeClassNameValid(columnAllocationSizeClassName, headers.length)) {
    return (
      <div className="bg-red/50 mx-auto mt-4 flex w-11/12 flex-col items-center justify-center gap-4 rounded-md p-6">
        <h1 className="text-4xl font-black">Developer Note:</h1>
        <h2 className="text-3xl font-black">
          Please use a valid &quot;columnAllocationSizeClassName&quot; value, otherwise the table
          layout will not work. It should look like &quot;grid-cols-[10fr_8fr_4fr_4fr_6fr]&quot;
          which contains N items (equal to the number of headers).
        </h2>
      </div>
    );
  }

  if (showPagination && (!sizeOfPage || !onSizeOfPageChange)) {
    return (
      <div className="bg-red/50 mx-auto mt-4 flex w-11/12 flex-col items-center justify-center gap-4 rounded-md p-6">
        <h1 className="text-4xl font-black">Developer Note:</h1>
        <h2 className="text-3xl font-black">Invalid props.</h2>
        <h2 className="text-3xl font-black">
          Please provide a valid &quot;defaultSizeOfPage&quot; and &quot;onSizeOfPageChange&quot;
          props when &quot;showPagination&quot; is true.
        </h2>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center",
        isOnDarkMode ? "bg-black" : "bg-[#f9f9f9]",
      )}
    >
      <div
        className={cn(
          "mt-10 w-full rounded-[12px] border border-solid",
          isOnDarkMode ? "border-[#161619]/5" : "border-[#161619]/8",
        )}
      >
        {/* Table headings */}
        <HeaderRow
          headers={headers}
          columnAllocationSizeClassName={columnAllocationSizeClassName}
          isOnDarkMode={isOnDarkMode}
          overrideClassName={headerRowClassName}
          onHeaderCellSortIconClick={onHeaderCellSortIconClick}
        />
        {/* Table rows */}
        <TableRows
          cellItems={cellItems}
          columnAllocationSizeClassName={columnAllocationSizeClassName}
          isOnDarkMode={isOnDarkMode}
          onRowClick={onRowClick}
          overrideClassName={rowClassName}
        />
        {/* Table pagination */}
        <TablePaginationBottom
          showPagination={showPagination}
          isOnDarkMode={isOnDarkMode}
          totalNumberOfItems={totalNumberOfItems}
          page={page}
          onPageChange={onPageChange}
          sizeOfPage={sizeOfPage}
          onSizeOfPageChange={onSizeOfPageChange}
        />
      </div>
    </div>
  );
}

interface HeaderRowProps {
  headers: HeaderItem[];
  columnAllocationSizeClassName: string;
  isOnDarkMode?: boolean;
  overrideClassName?: string;
  onHeaderCellSortIconClick?: (clickedHeaderCell: LabelWithIndex) => void;
}

function HeaderRow({
  headers,
  columnAllocationSizeClassName,
  isOnDarkMode = false,
  overrideClassName,
  onHeaderCellSortIconClick,
}: HeaderRowProps) {
  function headerCellSortIconClickHandler(item: HeaderItem, index: number) {
    if (!item.isSortable) {
      return;
    }
    onHeaderCellSortIconClick?.({ index: index, label: item.label });
  }

  return (
    <div
      className={cn(
        "grid font-semibold",
        columnAllocationSizeClassName,
        "border-b border-[#161619]/30 border-solid",
        overrideClassName,
      )}
    >
      {headers.map((h, idx) => {
        return (
          <div
            className={cn("flex flex-row gap-2 border-solid border-[#161619]/15 p-4", {
              "border-l": 0 < idx,
              "border-r": idx < headers.length - 1,
              "text-left": idx === 0,
              "text-right": idx > 0,
            })}
            key={idx}
          >
            <p
              key={idx}
              className={cn(
                "text-md font-medium",
                "w-full overflow-hidden text-ellipsis whitespace-normal break-words",
                isOnDarkMode ? "text-white/70" : "text-black",
              )}
            >
              {h.label}
            </p>
            <SortIconSvg
              className={cn(
                "cursor-pointer",
                { "hover:opacity-50": h.isSortable },
                { hidden: !h.isSortable },
                { "rotate-180": h.isAscending },
              )}
              onClick={() => headerCellSortIconClickHandler(h, idx)}
            />
          </div>
        );
      })}
    </div>
  );
}

interface TableRowsProps {
  cellItems: CellItem[][];
  columnAllocationSizeClassName: string;
  isOnDarkMode?: boolean;
  onRowClick?: (rowIndex: number) => void;
  overrideClassName?: string;
}

function TableRows({
  cellItems,
  columnAllocationSizeClassName,
  isOnDarkMode = false,
  onRowClick,
  overrideClassName,
}: TableRowsProps) {
  if (!cellItems || cellItems.length === 0) {
    return (
      <p
        className={cn(
          "w-full p-4 text-center text-lg",
          isOnDarkMode ? "text-white/70" : "text-black",
          overrideClassName,
        )}
      >
        No results found
      </p>
    );
  }

  return (
    <div className="bg-background flex flex-col">
      {cellItems.map((items, idx) => {
        return (
          <div
            key={idx}
            className={cn(
              "grid font-semibold items-center",
              columnAllocationSizeClassName,
              isOnDarkMode
                ? "bg-[#262629] rounded-[6px] mb-2"
                : idx % 2 === 0
                  ? "bg-transparent"
                  : "bg-[#161619]/5",
              overrideClassName,
            )}
            onClick={() => onRowClick?.(idx)}
          >
            {items.map((c, idx) => (
              <div
                key={idx}
                className={cn(
                  "text-md font-medium p-4",
                  "w-full overflow-hidden text-ellipsis whitespace-normal break-words",
                  {
                    "text-left": idx === 0,
                    "text-right": idx > 0,
                  },
                  isOnDarkMode ? "text-white/70" : "text-black",
                )}
              >
                {c}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

const PAGINATION_DROP_DOWN_OPTIONS: LabeledValue<number>[] = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];

interface TablePaginationBottomProps {
  showPagination: boolean;
  isOnDarkMode?: boolean;
  totalNumberOfItems: number;
  page: number;
  onPageChange: (page: number) => void;
  sizeOfPage: number;
  onSizeOfPageChange: (sizeOfPage: number) => void;
}

function TablePaginationBottom({
  showPagination,
  isOnDarkMode = false,
  totalNumberOfItems,
  page,
  onPageChange,
  sizeOfPage,
  onSizeOfPageChange,
}: TablePaginationBottomProps) {
  const numberOfPages = Math.ceil(totalNumberOfItems / sizeOfPage);
  const selectedSizeOfPage = { label: sizeOfPage.toString(), value: sizeOfPage };
  const isLeftArrowDisabled = page <= 1;
  const isRightArrowDisabled = numberOfPages <= page;

  function clickOnRightArrowHandler() {
    if (numberOfPages < page + 1) {
      return;
    }
    onPageChange(page + 1);
  }

  function clickOnLeftArrowHandler() {
    if (page <= 1) {
      return;
    }
    onPageChange(page - 1);
  }

  if (!showPagination) {
    return <></>;
  }

  return (
    <div className="flex flex-row items-center justify-between border-t border-solid border-[#161619]/15 p-4 font-semibold text-black">
      <div className="flex flex-row items-center justify-center gap-4">
        <Dropdown
          options={PAGINATION_DROP_DOWN_OPTIONS}
          selectedOption={selectedSizeOfPage}
          setSelectedOption={(v: LabeledValue<number>) => onSizeOfPageChange(v.value)}
          showBorders={false}
        />
        <p className="text-[#9C9C9C]">Items</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <ArrowLeftSvg
          width="12"
          height="12"
          className={cn("cursor-pointer", { "hover:opacity-50": !isLeftArrowDisabled })}
          onClick={clickOnLeftArrowHandler}
          isDisabled={isLeftArrowDisabled}
        />
        <p className="px-4 py-2 text-[#9C9C9C]">
          Page {page} of {numberOfPages}
        </p>
        <ArrowRightSvg
          width="12"
          height="12"
          className={cn("cursor-pointer", { "hover:opacity-50": !isRightArrowDisabled })}
          onClick={clickOnRightArrowHandler}
          isDisabled={isRightArrowDisabled}
        />
      </div>
    </div>
  );
}
