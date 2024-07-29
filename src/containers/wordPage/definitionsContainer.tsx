import React, { useMemo, useState } from "react";
import { SupportedLang, WordDefinitionsResults } from "~/interfaces";
import parse from "html-react-parser";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "~/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { fetchExactWordDefinitions } from "~/requests";
import { addToWordHistoryCache, findInWordHistoryCache } from "~/cache/wordHistory";

export default function DefinitionsContainer({ wordSpelling }: { wordSpelling: string }) {
  const [selectedFromTab, setSelectedFromTab] = useState<SupportedLang | "All">("All");
  const [selectedToTab, setSelectedToTab] = useState<SupportedLang | "All">("All");

  const {
    data: allDefResults = [] as WordDefinitionsResults[],
    isLoading: isWordDefinitionsLoading,
    isError: isWordDefinitionsErrored,
  } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    retry: 1,
    queryKey: ["wordDefinitions", wordSpelling],
    queryFn: async (): Promise<WordDefinitionsResults[]> => {
      if (!wordSpelling || wordSpelling.trim() === "") {
        return [];
      }
      const foundResults = findInWordHistoryCache(wordSpelling);
      if (foundResults) {
        return foundResults;
      }

      const wordObjectRes = await fetchExactWordDefinitions(wordSpelling);
      if (wordObjectRes.isErr()) {
        console.error(`Failed to find word definitions for ${wordSpelling}`);
        throw new Error(`Failed to find word definitions for ${wordSpelling}`);
      }
      addToWordHistoryCache(wordObjectRes.value);
      return wordObjectRes.value;
    },
  });

  const uniqueFromLangs = useMemo(() => {
    const allLangs = new Set<SupportedLang>();
    allDefResults.forEach((wd) => {
      wd.fromLangs.forEach((lang) => allLangs.add(lang));
    });
    return Array.from(allLangs);
  }, [allDefResults]);

  const uniqueToLangs = useMemo(() => {
    const allLangs = new Set<SupportedLang>();
    allDefResults.forEach((wd) => {
      wd.toLangs.forEach((lang) => allLangs.add(lang));
    });
    return Array.from(allLangs);
  }, [allDefResults]);

  const defResultsAfterFilter = useMemo(() => {
    return allDefResults.filter((wd) => {
      const fromLangs = wd.fromLangs;
      const toLangs = wd.toLangs;
      return (
        (selectedFromTab === "All" || fromLangs.includes(selectedFromTab)) &&
        (selectedToTab === "All" || toLangs.includes(selectedToTab))
      );
    });
  }, [allDefResults, selectedFromTab, selectedToTab]);

  if (isWordDefinitionsLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex items-center justify-center p-4">
          <div className="size-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (isWordDefinitionsErrored) {
    return (
      <div className="mt-4 flex size-full items-center justify-center">
        <p className="text-red text-3xl">
          Failed to load word &apos;{wordSpelling}&apos; definitions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Word spelling and total results */}
      <div className="flex flex-row items-center justify-start gap-2 px-2">
        <span
          className={cn(
            "text-left font-black text-cyan-800",
            "3xl:text-7xl 2xl:text-6xl xl:text-5xl lg:text-4xl text-4xl",
          )}
        >
          {wordSpelling}
        </span>
        <div
          className={cn(
            "mt-0 sm:mt-3 text-left font-black text-cyan-800",
            "3xl:text-3xl 2xl:text-3xl xl:text-2xl lg:text-xl text-lg",
          )}
        >
          {allDefResults.length === defResultsAfterFilter.length ? (
            <span>({allDefResults.length} results)</span>
          ) : (
            <span>
              ({defResultsAfterFilter.length} out of {allDefResults.length} results)
            </span>
          )}
        </div>
      </div>

      {/* Filter buttons */}
      <ResultFilters
        selectedFromTab={selectedFromTab}
        selectedToTab={selectedToTab}
        setSelectedFromTab={setSelectedFromTab}
        setSelectedToTab={setSelectedToTab}
        uniqueFromLangs={uniqueFromLangs}
        uniqueToLangs={uniqueToLangs}
      />

      {/* Definitions */}
      <DefinitionsBox wordDefinitions={defResultsAfterFilter} />
    </div>
  );
}

function DefinitionsBox({ wordDefinitions }: { wordDefinitions: WordDefinitionsResults[] }) {
  const [definitionVisible, setDefinitionVisible] = useState<boolean[]>(() =>
    Array(wordDefinitions.length).fill(true),
  );

  const toggleDefinitionVisibility = (index: number) => {
    setDefinitionVisible((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="my-8 flex flex-col gap-6">
      {wordDefinitions.map((wd, idx) => (
        <div
          key={idx}
          className={cn("flex flex-col", {
            "rounded-2xl border-l-4 border-solid border-green": definitionVisible[idx],
          })}
        >
          <button
            className="flex w-full items-center justify-between rounded-t-2xl bg-[#b7edad] px-4 py-2 font-bold shadow"
            onClick={() => toggleDefinitionVisibility(idx)}
          >
            <span
              className={cn("2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-md")}
            >
              {wd.title} ({wd.fromLangs.join("/")} {"->"} {wd.toLangs.join("/")})
            </span>
            <HiChevronDown className="ml-2" />
          </button>
          <div
            className={cn(
              "bg-[#f4fff1] p-2 text-black shadow-sm",
              "2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm",
              { hidden: !definitionVisible[idx] },
            )}
          >
            {parse(wd.html)}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ResultFiltersProps {
  selectedFromTab: SupportedLang | "All";
  selectedToTab: SupportedLang | "All";
  setSelectedFromTab: (lang: SupportedLang | "All") => void;
  setSelectedToTab: (lang: SupportedLang | "All") => void;
  uniqueFromLangs: SupportedLang[];
  uniqueToLangs: SupportedLang[];
}

function ResultFilters({
  selectedFromTab,
  selectedToTab,
  setSelectedToTab,
  setSelectedFromTab,
  uniqueFromLangs,
  uniqueToLangs,
}: ResultFiltersProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 px-2 text-lg sm:flex-row md:gap-10 md:text-xl lg:gap-20 lg:text-2xl xl:text-4xl">
      {/* From and To language filters */}
      <div className="flex flex-col flex-wrap gap-2">
        <p className="mr-0 font-bold text-blue-500 sm:mr-4">From Language:</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={cn("sm:px-4 px-2 py-2 font-bold", {
              "bg-blue-500 text-white": selectedFromTab === "All",
            })}
            onClick={() => setSelectedFromTab("All")}
          >
            All
          </button>
          {uniqueFromLangs.sort().map((lang) => (
            <button
              key={lang}
              className={cn("sm:px-4 px-2 py-2 font-bold", {
                "bg-blue-500 text-white": selectedFromTab === lang,
              })}
              onClick={() => setSelectedFromTab(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* To language filter */}
      <div className="flex flex-col flex-wrap gap-2">
        <p className="mr-0 font-bold text-blue-500 sm:mr-4">To Language:</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={cn("sm:px-4 px-2 py-2 font-bold", {
              "bg-blue-500 text-white": selectedToTab === "All",
            })}
            onClick={() => setSelectedToTab("All")}
          >
            All
          </button>
          {uniqueToLangs.sort().map((lang) => (
            <button
              key={lang}
              className={cn("sm:px-4 px-2 py-2 font-bold", {
                "bg-blue-500 text-white": selectedToTab === lang,
              })}
              onClick={() => setSelectedToTab(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
