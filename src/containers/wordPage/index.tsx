import React, { useState } from "react";
import { WordObject } from "~/interfaces";
import parse from "html-react-parser";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { cn } from "~/utils/classNames";

interface WordPageContainerProps {
  wordDefinitions: WordObject[];
  wordSpelling: string;
}

export default function WordPageContainer({
  wordDefinitions,
  wordSpelling,
}: WordPageContainerProps) {
  return (
    <div className="mx-auto mt-16 flex w-11/12 flex-col">
      <div className="flex flex-row items-center justify-start gap-2 px-2">
        <span className="text-left text-6xl font-black text-cyan-800">{wordSpelling}</span>
        <span className="mt-3 text-left text-3xl font-black text-cyan-800">
          ({wordDefinitions.length} results)
        </span>
      </div>

      <WordDefinitions wordDefinitions={wordDefinitions} />
    </div>
  );
}

function WordDefinitions({ wordDefinitions }: { wordDefinitions: WordObject[] }) {
  // State to manage visibility of definitions
  const [definitionVisible, setDefinitionVisible] = useState<boolean[]>(() =>
    Array(wordDefinitions.length).fill(true),
  );

  // Toggle visibility of definition at index
  const toggleDefinitionVisibility = (index: number) => {
    setDefinitionVisible((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="my-8 flex w-full flex-col gap-6">
      {wordDefinitions.map((wd, idx) => {
        return (
          <div key={idx} className="flex w-full flex-col">
            <button
              className="flex w-full items-center justify-between rounded-t-2xl bg-[#deffd8] p-2 font-bold shadow"
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
        );
      })}
    </div>
  );
}
