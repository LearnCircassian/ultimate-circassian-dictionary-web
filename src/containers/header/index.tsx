import React, { useRef, useEffect, useState } from "react";
import HeaderSearchInput from "~/components/headerSearchInput";
import { useQuery } from "@tanstack/react-query";
import { fetchWordAutocompletes } from "~/requests";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/classNames";

export default function Header() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const router = useRouter();

  function wordSelectionHandler(word: string) {
    setSearchInputValue("");
    router.push(`/word/${word}`);
  }

  return (
    <div className="relative z-50 mx-auto flex w-full flex-col gap-4 bg-[#315bb4] p-4 shadow">
      <div className="flex flex-row items-center justify-center">
        <HeaderSearchInput
          value={searchInputValue}
          onChange={setSearchInputValue}
          onFocus={() => setDropdownVisible(true)} // Set dropdownVisible state on focus
          placeholder="Let's find your word"
          className="w-full max-w-md"
        />
      </div>
      {dropdownVisible && (
        <HeaderSearchResultsDropdown
          searchInputValue={searchInputValue}
          onWordSelection={wordSelectionHandler}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </div>
  );
}

function HeaderSearchResultsDropdown({
  searchInputValue,
  onWordSelection,
  setDropdownVisible,
}: {
  searchInputValue: string;
  setDropdownVisible: (visible: boolean) => void;
  onWordSelection: (word: string) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: wordsResults = [], isLoading } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["autocompleteWords", searchInputValue],
    queryFn: async () => {
      if (!searchInputValue || searchInputValue.length < 2) {
        return [];
      }
      const res = await fetchWordAutocompletes(searchInputValue);
      if (res.isErr()) {
        return [];
      }
      return res.value;
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Keep dropdown open when clicking inside search input
        if (event.target instanceof HTMLElement && event.target.tagName === "INPUT") {
          return;
        }
        // Close dropdown if clicked outside
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!searchInputValue || searchInputValue.length < 2) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-1/2 top-[100px] max-h-80  flex w-96 -translate-x-1/2 transform flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-[16px] bg-white shadow-lg",
        )}
      >
        <div className="flex items-center justify-center p-4">
          <div className="border-blue-500 size-8 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (wordsResults.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-1/2 top-[100px] max-h-80 flex w-96 -translate-x-1/2 transform flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-[16px] bg-white shadow-lg",
        )}
      >
        <div className="my-4 text-3xl font-semibold text-black">No results found</div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "scrollbar-gray absolute left-1/2 top-[100px] flex w-96 -translate-x-1/2 transform flex-col items-center justify-start gap-2 overflow-y-auto rounded-b-[16px] bg-white p-4 shadow-lg",
        "3xl:max-h-[1024px] 2xl:max-h-[820px] xl:max-h-[620px] lg:max-h-[480px] md:max-h-[360px] sm:max-h-[280px] max-h-[160px]",
      )}
    >
      <div className="w-full border-b-2 border-solid border-[#0049d7] px-2 py-4 text-left text-lg font-bold">
        Definitions
      </div>
      {wordsResults?.map((word) => (
        <button
          className="hover:bg-gray-100 w-full rounded-md p-2 text-left text-lg font-medium hover:bg-[#e7e7e7]"
          key={word}
          onClick={() => onWordSelection(word)}
        >
          {word}
        </button>
      ))}
    </div>
  );
}
