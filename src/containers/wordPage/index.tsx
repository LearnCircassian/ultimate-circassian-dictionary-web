import React, { useState } from "react";
import { WordObject } from "~/interfaces";
import parse from "html-react-parser";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface WordPageContainerProps {
  wordDefinitions: WordObject[];
  wordSpelling: string;
}

export default function WordPageContainer({
  wordDefinitions,
  wordSpelling,
}: WordPageContainerProps) {
  console.log(wordDefinitions, wordSpelling);

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
    <div className="mx-auto mb-8 flex flex-col gap-8">
      <h1 className="bg-[#d3ebb9] py-2 text-center text-6xl font-black text-cyan-800 shadow">
        {wordSpelling}
      </h1>

      <div className="mx-auto flex w-11/12 flex-col gap-8">
        {wordDefinitions.map((wd, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-4">
              <button
                className="flex items-center justify-between rounded-sm border border-dotted border-black bg-[#d9ebc5] p-2 text-xl font-bold shadow"
                onClick={() => toggleDefinitionVisibility(idx)}
              >
                <span>
                  {wd.title} ({wd.fromLang} {"->"} {wd.toLang})
                </span>
                {definitionVisible[idx] ? (
                  <HiChevronUp className="ml-2" />
                ) : (
                  <HiChevronDown className="ml-2" />
                )}
              </button>
              {definitionVisible[idx] && <div className="text-xl text-black">{parse(wd.html)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
