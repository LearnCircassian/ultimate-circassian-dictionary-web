import { useDebounce } from "use-debounce";
import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Result } from "neverthrow";
import { containsOnlyEnglishLetters } from "~/utils/lang";
import {
  fetchWordAutocompletes,
  fetchWordAutocompletesThatContains,
  fetchWordAutocompletesWithVerbs,
} from "~/requests";
import { cn } from "~/utils/classNames";
import {
  findAllAutocompletesInWordHistoryCache,
  findAutocompletesInWordHistoryCache,
  removeFromWordHistoryCache,
} from "~/cache/wordHistory";
import { Autocomplete } from "~/interfaces";
import { replaceStickLettersToPalochka } from "~/utils/wordFormatting";
import { FaTimesCircle } from "react-icons/fa";

interface HeaderSearchResultsDropdownProps {
  searchInputValue: string;
  onWordSelection: (word: string) => void;
  setDropdownVisible: (visible: boolean) => void;
}

const SIZE_STYLE = cn("sm:w-full w-11/12");

export default function HeaderSearchResultsDropdown({
  searchInputValue,
  onWordSelection,
  setDropdownVisible,
}: HeaderSearchResultsDropdownProps) {
  const [debouncedSearchInputValue] = useDebounce(searchInputValue, 500);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: autocompletesList = [], isLoading: isAutocompletesListLoading } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["autocompleteWords", debouncedSearchInputValue],
    queryFn: async (): Promise<Autocomplete[]> => {
      if (!debouncedSearchInputValue) {
        return [];
      }

      let res: Result<Autocomplete[], string>;
      if (4 <= debouncedSearchInputValue.length) {
        res = await fetchWordAutocompletesThatContains(debouncedSearchInputValue);
      } else if (containsOnlyEnglishLetters(debouncedSearchInputValue)) {
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

  const { data: cachedAutocompletesList = [], refetch: refetchCachedAutocompletesList } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["cachedAutocompletesList", debouncedSearchInputValue],
    queryFn: async (): Promise<string[]> => {
      if (debouncedSearchInputValue.trim() === "") {
        return findAllAutocompletesInWordHistoryCache();
      }
      return findAutocompletesInWordHistoryCache(debouncedSearchInputValue).map((w) => {
        return replaceStickLettersToPalochka(w);
      });
    },
  });

  function cachedWordDeleteClickHandler(word: string) {
    removeFromWordHistoryCache(word);
    refetchCachedAutocompletesList();
  }

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

  if (debouncedSearchInputValue.trim() === "" && cachedAutocompletesList.length === 0) {
    return null;
  }

  if (isAutocompletesListLoading) {
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

  if (autocompletesList.length === 0 && cachedAutocompletesList.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className={cn(
          "absolute py-4 left-1/2 top-[80px] max-h-80 flex -translate-x-1/2 transform flex-col items-center justify-center overflow-y-auto rounded-b-[16px] bg-white shadow-lg",
          SIZE_STYLE,
        )}
      >
        <p className="text-3xl font-semibold text-black">No results found</p>
        <p className="text-2xl font-semibold text-black">
          (Make sure you selected the right filters before searching)
        </p>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "scrollbar-gray absolute w-screen left-2/4 sm:left-1/2 top-[80px] flex -translate-x-1/2 transform flex-col items-center justify-start gap-2 rounded-b-[16px] bg-white shadow-lg",
        "6xl:max-h-[1440px] 5xl:max-h-[1200px] 4xl:max-h-[1024px] 3xl:max-h-[900px] 2xl:max-h-[800px] xl:max-h-[700px] lg:max-h-[600px] md:max-h-[600px] max-h-[600px]",
        "w-full overflow-x-hidden text-ellipsis whitespace-normal break-words overflow-y-auto",
        "p-0 sm:p-1 md:p-2 lg:p-4",
        SIZE_STYLE,
      )}
    >
      <div className="w-full border-b-2 border-solid border-[#0049d7] px-2 py-4 text-left text-lg font-bold">
        Definitions
      </div>
      {cachedAutocompletesList
        .sort((a, b) => {
          const searchInputValAdjusted = replaceStickLettersToPalochka(debouncedSearchInputValue);
          // Prioritize words that start with debouncedSearchInputValue
          const aStartsWith = a.toLowerCase().startsWith(searchInputValAdjusted.toLowerCase());
          const bStartsWith = b.toLowerCase().startsWith(searchInputValAdjusted.toLowerCase());

          if (aStartsWith && !bStartsWith) {
            return -1;
          }
          if (!aStartsWith && bStartsWith) {
            return 1;
          }

          // If both or neither start with debouncedSearchInputValue, sort alphabetically
          return a.localeCompare(b);
        })
        .map((word) => {
          const searchInputValAdjusted = replaceStickLettersToPalochka(debouncedSearchInputValue);
          const index = word.toLowerCase().indexOf(searchInputValAdjusted.toLowerCase());
          const before = word.slice(0, index);
          const bold = word.slice(index, index + searchInputValAdjusted.length);
          const after = word.slice(index + searchInputValAdjusted.length);

          return (
            <div key={word} className="flex w-full flex-row justify-between p-2 hover:bg-[#e7e7e7]">
              <button
                className={cn(
                  "w-full rounded-md text-left font-medium text-[#bb90f6]",
                  "text-lg 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl xl:text-xl",
                )}
                onClick={() => onWordSelection(word)}
              >
                <span>
                  {before}
                  <span className="font-bold">{bold}</span>
                  {after}
                </span>
              </button>
              <button
                className="hidden text-neutral-800 hover:text-neutral-600/50 hover:underline sm:flex"
                onClick={() => cachedWordDeleteClickHandler(word)}
              >
                Delete
              </button>
              <button
                className="visible text-neutral-800 hover:text-neutral-600/50 hover:underline sm:hidden"
                onClick={() => cachedWordDeleteClickHandler(word)}
              >
                <FaTimesCircle className="opacity-80" size={20} color="#757575" />{" "}
              </button>
            </div>
          );
        })}
      {autocompletesList
        .filter((a) => {
          return !cachedAutocompletesList.includes(a.key);
        })
        .sort((a, b) => {
          const searchInputValAdjusted = replaceStickLettersToPalochka(debouncedSearchInputValue);
          // Prioritize words that start with debouncedSearchInputValue
          const aStartsWith = a.key.toLowerCase().startsWith(searchInputValAdjusted.toLowerCase());
          const bStartsWith = b.key.toLowerCase().startsWith(searchInputValAdjusted.toLowerCase());

          if (aStartsWith && !bStartsWith) {
            return -1;
          }
          if (!aStartsWith && bStartsWith) {
            return 1;
          }

          // If both or neither start with debouncedSearchInputValue, sort alphabetically
          return a.key.localeCompare(b.key);
        })
        .map((word) => {
          const searchInputValAdjusted = replaceStickLettersToPalochka(debouncedSearchInputValue);
          const index = word.key.toLowerCase().indexOf(searchInputValAdjusted.toLowerCase());
          const before = word.key.slice(0, index);
          const bold = word.key.slice(index, index + searchInputValAdjusted.length);
          const after = word.key.slice(index + searchInputValAdjusted.length);

          return (
            <button
              className={cn(
                "hover:bg-gray-100 w-full rounded-md p-2 text-left font-medium hover:bg-[#e7e7e7]",
              )}
              key={word.key}
              onClick={() => onWordSelection(word.key)}
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <span className="mt-1 text-xxs sm:text-xs md:text-base">
                  [{word.fromLangs.join(", ")}]
                </span>
                <span className="text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl">
                  {before}
                  <span className="font-bold">{bold}</span>
                  {after}
                </span>
              </div>
            </button>
          );
        })}
    </div>
  );
}
