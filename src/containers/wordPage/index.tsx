import React from "react";
import DefinitionsContainer from "~/containers/wordPage/definitionsContainer";
import WordHistoryContainer from "~/containers/wordPage/wordHistoryContainer";
import { cn } from "~/utils/classNames";
import WordPageFooter from "~/containers/wordPage/wordPageFooter"; // Import the arrow icons

export default function WordPageContainer({ wordSpelling }: { wordSpelling: string }) {
  return (
    <div className="mx-auto my-16 flex w-11/12 flex-col items-center justify-center gap-2 rounded-sm bg-white py-8 shadow-xl xl:w-full xl:max-w-screen-xl">
      <div
        className={cn(
          "mx-auto my-20 flex w-11/12 flex-[1] flex-row",
          "gap-2 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 3xl:gap-16",
        )}
      >
        <div className="mt-4 hidden md:flex lg:flex-[2] xl:flex-[2] 2xl:flex-[2] 3xl:flex-[1]">
          <WordHistoryContainer />
        </div>
        <div className="flex flex-[7]">
          <DefinitionsContainer wordSpelling={wordSpelling} />
        </div>
      </div>
      <div className="z-30">
        <WordPageFooter />
      </div>
    </div>
  );
}
