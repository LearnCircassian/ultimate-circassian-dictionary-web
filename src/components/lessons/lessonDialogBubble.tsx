import { ICharacter } from "~/interfaces";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import TopTooltipWithBottomSpike from "~/components/tooltip";
import React from "react";

export default function LessonDialogBubble({
  leftOrRight,
  character,
  cirText,
  wordByWordTranslation,
  engTranslation,
}: {
  leftOrRight: "left" | "right";
  character: ICharacter;
  cirText: string;
  wordByWordTranslation: string[];
  engTranslation: string;
}) {
  // Split the cirText into words
  const cirTextWords = cirText.split(" ");

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn("flex items-start gap-4", {
          "flex-row": leftOrRight === "left",
          "flex-row-reverse": leftOrRight === "right",
        })}
      >
        {/* Avatar and name */}
        <div className="flex flex-col items-center gap-1">
          <Image src={character.avatar} alt={character.name} width={50} height={50} />
          <p className="text-[#4a7324] text-2xl font-bold">{character.name}</p>
        </div>

        {/* Dialog bubble */}
        <div className="relative">
          <div
            className={cn(
              "border border-solid p-4 rounded-sm relative flex flex-row flex-wrap gap-4",
              { "bg-[#fbddd1] border-[#f19f76]": leftOrRight === "left" },
              { "bg-[#d6e8ce] border-[#96c07e]": leftOrRight === "right" },
            )}
          >
            {cirTextWords.map((word, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-1 w-fit flex-wrap">
                  <TopTooltipWithBottomSpike text={wordByWordTranslation[idx]}>
                    <span className="text-black text-2xl leading-none font-semibold hover:text-blue-400">
                      {word}
                    </span>
                  </TopTooltipWithBottomSpike>
                  <span className="text-gray-600 text-base font-medium leading-none">
                    {wordByWordTranslation[idx]}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Spike */}
          <div
            className={cn("absolute top-4 w-0 h-0", {
              // Spike styles for "left"
              "-left-2 border-t-[10px] border-t-transparent border-r-[10px] border-r-[#fbddd1] border-b-[10px] border-b-transparent":
                leftOrRight === "left",
              // Spike styles for "right"
              "-right-2 border-t-[10px] border-t-transparent border-l-[10px] border-l-[#d6e8ce] border-b-[10px] border-b-transparent":
                leftOrRight === "right",
            })}
          />
        </div>
      </div>
      <p className="text-2xl border-b-2 border-solid border-gray-300">{engTranslation}</p>
    </div>
  );
}
