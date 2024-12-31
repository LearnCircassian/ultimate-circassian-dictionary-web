import Head from "next/head";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { LESSON_LIST } from "~/constants/content";
import { cn } from "~/utils/classNames";
import { ICharacter } from "~/interfaces";
import LessonDialogBubble from "~/components/lessons/lessonDialogBubble";
import LessonTable from "~/components/lessons/lessonTable";

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

  const selectedLessonComponent = useMemo(() => {
    switch (lessonIndex) {
      case "1":
        return <Lesson_1 />;
      case "2":
        return <Lesson_2 />;
      default:
        return <Lesson_1 />;
    }
  }, [lessonIndex]);

  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main className="bg-white w-full">
        <div className="mx-auto w-11/12 flex flex-row">
          {/* Sidebar with lessons */}
          <div className="flex-[2_2_0%] border-r border-solid border-black flex flex-col justify-start items-start gap-2 pt-4">
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
            {selectedLessonComponent}
          </div>
        </div>
      </main>
    </>
  );
}

function Lesson_1() {
  return (
    <div className="flex flex-col gap-6">
      <LessonDialogBubble
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
      <LessonDialogBubble
        leftOrRight="right"
        character={CHARACTERS[1]}
        cirText="Сэ сцlэр Сэтэнай."
        engTranslation="My name is Satanay."
        wordByWordTranslation={["I", "name is", "Satanay"]}
      />
    </div>
  );
}

function Lesson_2() {
  const content = [
    ["О-сы", "Уа-сэ", "Са-сэ", "Си-мэ"],
    ["Се-сы", "Уис", "Е-сы", "Мы-е"],
    ["Ис", "Уа-е", "Сис", "Е-о"],
    ["У-сэ", "Мэу", "Ау", "Сэ"],
  ];

  return (
    <div className="flex flex-col gap-6">
      <LessonTable rows={content} showIndexes={true} />
    </div>
  );
}
