import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { LESSON_LIST } from "~/constants/content";
import { cn } from "~/utils/classNames";

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
            {LESSON_LIST.map((lesson, idx) => (
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
            ))}
          </div>
          {/* Main content area */}
          <div className="flex-[3_3_0%] border-solid border-black"></div>
        </div>
      </main>
    </>
  );
}
