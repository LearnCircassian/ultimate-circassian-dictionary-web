import React, { useState } from "react";
import { WordResult } from "~/interfaces";
import parse from "html-react-parser";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "~/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { fetchWordDefinitions } from "~/requests";
import { addToWordHistoryCache, findInWordHistoryCache } from "~/cache/wordHistory";

export default function DefinitionsContainer({ wordSpelling }: { wordSpelling: string }) {
  const {
    data: wordDefinitions = [] as WordResult[],
    isLoading: isWordDefinitionsLoading,
    isError: isWordDefinitionsErrored,
  } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    retry: 1,
    queryKey: ["wordDefinitions", wordSpelling],
    queryFn: async (): Promise<WordResult[]> => {
      if (!wordSpelling || wordSpelling.trim() === "") {
        return [];
      }
      const foundResults = findInWordHistoryCache(wordSpelling);
      if (foundResults) {
        return foundResults;
      }

      const wordObjectRes = await fetchWordDefinitions(wordSpelling);
      if (wordObjectRes.isErr()) {
        throw new Error(`Failed to find word definitions for ${wordSpelling}`);
      }
      addToWordHistoryCache(wordObjectRes.value);
      return wordObjectRes.value;
    },
  });

  if (isWordDefinitionsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center justify-center p-4">
          <div className="border-blue-500 size-8 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (isWordDefinitionsErrored) {
    return (
      <div className="mt-4 flex h-full items-center justify-center">
        <p className="text-3xl text-red">
          Failed to load word &apos;{wordSpelling}&apos; definitions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-start gap-2 px-2">
        <span
          className={cn(
            "text-left font-black text-cyan-800",
            "3xl:text-7xl 2xl:text-6xl xl:text-5xl lg:text-4xl text-4xl",
          )}
        >
          {wordSpelling}
        </span>
        <span
          className={cn(
            "mt-0 sm:mt-3 text-left font-black text-cyan-800",
            "3xl:text-3xl 2xl:text-3xl xl:text-2xl lg:text-xl text-lg",
          )}
        >
          ({wordDefinitions.length} results)
        </span>
      </div>

      <WordDefinitions wordDefinitions={wordDefinitions} />
    </div>
  );
}

function WordDefinitions({ wordDefinitions }: { wordDefinitions: WordResult[] }) {
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
              {wd.title} ({wd.fromLang} {"->"} {wd.toLang})
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
