import Head from "next/head";
import React from "react";
import ContainerDiv from "~/components/containerDiv";
import { useRouter } from "next/navigation";
import { LESSON_LIST } from "~/constants/content";

export default function TheLanguagePathPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <ContainerDiv className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {LESSON_LIST.map((lesson, index) => {
              return (
                <LessonButton
                  key={lesson}
                  title={lesson}
                  index={index + 1}
                  onClick={() => router.push(`/the-language-path/${index + 1}`)}
                />
              );
            })}
          </div>
        </ContainerDiv>
      </main>
    </>
  );
}

function LessonButton({
  onClick,
  title,
  index,
}: {
  onClick: () => void;
  title: string;
  index: number;
}) {
  return (
    <button
      className="cursor-pointer border-2 border-solid border-[#68a629] flex flex-row gap-2 justify-start items-center min-h-[80px]"
      onClick={onClick}
    >
      <div className="flex flex-col justify-start items-start h-full">
        <div className="bg-[#68a629] h-full px-4 flex flex-col justify-center items-center text-3xl text-white font-bold ml-4 rounded-b-lg">
          {index}
        </div>
        <div className="mb-2" />
      </div>
      <p className="text-3xl font-medium text-[#68a629] hover:underline text-left">{title}</p>
    </button>
  );
}
