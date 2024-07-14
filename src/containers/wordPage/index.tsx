import React from "react";
import { WordObject } from "~/interfaces";
import parse from "html-react-parser";

interface WordPageContainerProps {
  wordDefinitions: WordObject[];
  wordSpelling: string;
}

export default function WordPageContainer({
  wordDefinitions,
  wordSpelling,
}: WordPageContainerProps) {
  console.log(wordDefinitions, wordSpelling);
  return (
    <div className="mx-auto mb-8 flex flex-col gap-8">
      <h1 className="bg-[#d3ebb9] py-2 text-center text-6xl font-black text-cyan-800 shadow">
        {wordSpelling}
      </h1>

      <div className="mx-auto flex w-11/12 flex-col gap-8">
        {wordDefinitions.map((wd, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-4">
              <h2 className="rounded-sm border border-dotted border-black bg-[#d9ebc5] p-2 text-xl font-bold shadow">
                {wd.title} ({wd.fromLang} {"->"} {wd.toLang})
              </h2>
              <div className="text-xl text-black">{parse(wd.html)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
