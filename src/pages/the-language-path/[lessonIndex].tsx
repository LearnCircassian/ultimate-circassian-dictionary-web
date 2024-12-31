import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { LESSON_LIST } from "~/constants/content";
import { cn } from "~/utils/classNames";
import Image from "next/image";
import { ICharacter } from "~/interfaces";
import TopTooltipWithBottomSpike from "~/components/tooltip";

const CHARACTERS: ICharacter[] = [
  {
    name: "Данэ",
    avatar: "/lessons/girl1.png",
  },
  {
    name: "Сэтэнай",
    avatar: "/lessons/girl2.png",
  },
];

export default function TheLanguagePathPage() {
  const router = useRouter();
  const { lessonIndex } = router.query;

  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main className="bg-white w-full">
        <div className="mx-auto w-11/12 flex flex-row">
          {/* Sidebar with lessons */}
          <div className="flex-[2_2_0%] border-r border-solid border-black flex flex-col justify-center items-start gap-2 pt-4">
            {LESSON_LIST.map((lesson, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => router.push(`/the-language-path/${idx + 1}`)} // Navigate on click
                  className={cn(
                    "font-black",
                    Number(lessonIndex) === idx + 1
                      ? "text-red-500 hover:text-red-500/50"
                      : "text-black hover:text-black/50",
                  )}
                >
                  {idx + 1}. {lesson}
                </button>
              );
            })}
          </div>
          {/* Main content area */}
          <div className="flex-[3_3_0%] border-solid border-black p-4">
            <Lesson_1 />
          </div>
        </div>
      </main>
    </>
  );
}

function Lesson_1() {
  return (
    <div className="flex flex-col gap-2">
      <DialogBubble
        leftOrRight="left"
        character={CHARACTERS[0]}
        cirText="Уимафэ шlу. Сэ сцIэр Данэ. О сыда пцlэр?"
        engTranslation="Good day. My name is Dana. What is your name?"
        wordByWordTranslation={[
          "your day",
          "good",
          "I",
          "my name is",
          "Dana",
          "you",
          "what is",
          "your name",
        ]}
      />
      <DialogBubble
        leftOrRight="right"
        character={CHARACTERS[1]}
        cirText="Сэ сцlэр Сэтэнай."
        engTranslation="My name is Satanay."
        wordByWordTranslation={["I", "name is", "Satanay"]}
      />
    </div>
  );
}

function DialogBubble({
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
