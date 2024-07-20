import React, { useMemo, useState } from "react";
import { WordDefinitionsResults, SupportedLang } from "~/interfaces";
import parse from "html-react-parser";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "~/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { fetchExactWordDefinitions } from "~/requests";
import { addToWordHistoryCache, findInWordHistoryCache } from "~/cache/wordHistory";
import { getSearchFilterPrefsCache } from "~/cache/searchFilterPrefs";

export default function DefinitionsContainer({ wordSpelling }: { wordSpelling: string }) {
  const [selectedTab, setSelectedTab] = useState<SupportedLang | "All">("All");

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

  const uniqueToLangs = useMemo(() => {
    const allLangs = new Set<SupportedLang>();
    allDefResults.forEach((wd) => {
      wd.toLangs.forEach((lang) => allLangs.add(lang));
    });
    return Array.from(allLangs);
  }, [allDefResults]);

  const filteredDefResults = useMemo(() => {
    const searchFilterPrefs = getSearchFilterPrefsCache();
    const toLangsWhitelist = searchFilterPrefs.toLang;

    const filteredByPrefs = allDefResults.filter((wd) => {
      const toLangs = wd.toLangs;
      return toLangs.some((toLang) => toLangsWhitelist.includes(toLang));
    });

    if (selectedTab === "All") {
      return filteredByPrefs;
    } else {
      return filteredByPrefs.filter((wd) => wd.toLangs.includes(selectedTab));
    }
  }, [allDefResults, selectedTab]);

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
      <div className="mt-4 flex size-full items-center  justify-center">
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
          <span>({allDefResults.length} total results</span>
          <span className={cn({ hidden: allDefResults.length === filteredDefResults.length })}>
            , {allDefResults.length - filteredDefResults.length} results were filtered out
          </span>
          <span>)</span>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="mt-4 flex flex-row items-center justify-start gap-1 px-2 text-lg sm:gap-2 md:text-xl lg:text-2xl xl:text-4xl">
        <p className="mr-0 font-bold text-blue-500 sm:mr-4">Filter Results:</p>
        <button
          className={cn("sm:px-4 px-2 py-2 font-bold", {
            "bg-blue-500 text-white": selectedTab === "All",
          })}
          onClick={() => setSelectedTab("All")}
        >
          All
        </button>
        {uniqueToLangs.map((lang) => (
          <button
            key={lang}
            className={cn("sm:px-4 px-2 py-2 font-bold", {
              "bg-blue-500 text-white": selectedTab === lang,
            })}
            onClick={() => setSelectedTab(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Definitions */}
      <DefinitionsBox wordDefinitions={filteredDefResults} />
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
