import React from "react";
import { cn } from "~/utils/classNames";
import HeaderSearchInput from "~/components/headerSearchInput";

export default function Header() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");

  return (
    <div
      className={cn(
        "flex flex-col gap-2 mx-auto mt-[8px] w-11/12 z-50",
        "rounded-[12px] border border-solid border-black/12 bg-black px-[8px]",
      )}
    >
      <div className={cn("flex flex-row items-center justify-between")}>
        <div className="flex flex-row gap-2" />
        <div>
          <HeaderSearchInput
            value={searchInputValue}
            onChange={setSearchInputValue}
            placeholder="Search by Twitter/X"
          />
        </div>
        <div className="flex flex-row gap-8">
          <button className="px-4 py-2 text-lg text-white hover:text-gray" onClick={() => {}}>
            About
          </button>
          <button
            className="my-2 rounded-[8px] bg-[#E6E6E6] px-4 py-2 text-lg text-black hover:bg-[#E6E6E6]/90"
            onClick={() => {}}
          >
            New Entry
          </button>
        </div>
      </div>
    </div>
  );
}
