import React from "react";
import DefinitionsContainer from "~/containers/wordPage/definitionsContainer";
import WordHistoryContainer from "~/containers/wordPage/wordHistoryContainer";
import { cn } from "~/utils/classNames";
import WordPageFooter from "~/containers/wordPage/wordPageFooter"; // Import the arrow icons

export default function WordPageContainer({ wordSpelling }: { wordSpelling: string }) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "mx-auto mt-16 flex w-11/12 flex-row flex-[1]",
          "3xl:gap-16 2xl:gap-12 xl:gap-8 lg:gap-6 md:gap-4 sm:gap-4 gap-2",
        )}
      >
        <div className="mt-4 hidden md:flex lg:flex-[2] xl:flex-[2] 2xl:flex-[2] 3xl:flex-[1]">
          <WordHistoryContainer />
        </div>
        <div className="flex flex-[7]">
          <DefinitionsContainer wordSpelling={wordSpelling} />
        </div>
      </div>
      <WordPageFooter />
    </div>
  );
}
