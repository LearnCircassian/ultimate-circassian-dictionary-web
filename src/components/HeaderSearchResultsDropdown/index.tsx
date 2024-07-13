import { useDebounce } from "use-debounce";
import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Result } from "neverthrow";
import { containsOnlyEnglishLetters } from "~/utils/lang";
import { fetchWordAutocompletes, fetchWordAutocompletesWithVerbs } from "~/requests";
import { cn } from "~/utils/classNames";

interface HeaderSearchResultsDropdownProps {
  searchInputValue: string;
  onWordSelection: (word: string) => void;
  setDropdownVisible: (visible: boolean) => void;
}

const SIZE_STYLE = cn("xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-5/6 w-11/12");

export default function HeaderSearchResultsDropdown({
  searchInputValue,
  onWordSelection,
  setDropdownVisible,
}: HeaderSearchResultsDropdownProps) {
  const [debouncedSearchInputValue] = useDebounce(searchInputValue, 500);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: wordsResults = [], isLoading } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["autocompleteWords", debouncedSearchInputValue],
    queryFn: async () => {
      if (!debouncedSearchInputValue || debouncedSearchInputValue.length < 2) {
        return [];
      }

      let res: Result<string[], string>;
      if (containsOnlyEnglishLetters(debouncedSearchInputValue)) {
        res = await fetchWordAutocompletesWithVerbs(debouncedSearchInputValue);
      } else {
        res = await fetchWordAutocompletes(debouncedSearchInputValue);
      }

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
  }, [setDropdownVisible]);

  if (!debouncedSearchInputValue || debouncedSearchInputValue.length < 2) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-1/2 top-[80px] max-h-80 flex -translate-x-1/2 transform flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-[16px] bg-white shadow-lg",
          SIZE_STYLE,
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
          "absolute left-1/2 top-[80px] max-h-80 flex -translate-x-1/2 transform flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-[16px] bg-white shadow-lg",
          SIZE_STYLE,
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
        "scrollbar-gray absolute left-1/2 top-[80px] flex -translate-x-1/2 transform flex-col items-center justify-start gap-2 overflow-y-auto rounded-b-[16px] bg-white p-4 shadow-lg",
        "6xl:max-h-[1024px] 5xl:max-h-[920px] 4xl:max-h-[860px] 3xl:max-h-[700px] 2xl:max-h-[600px] xl:max-h-[600px] lg:max-h-[600px] md:max-h-[600px] max-h-[600px]",
        SIZE_STYLE,
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
