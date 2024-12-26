import Head from "next/head";
import React from "react";
import ContainerDiv from "~/components/containerDiv";
import { useRouter } from "next/navigation";

export default function GrammarPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <ContainerDiv className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <LessonButton
              index={1}
              title="The Letters"
              onClick={() => router.push(`/grammar/noun`)}
            />
            <LessonButton index={2} title="Welcome" onClick={() => router.push(`/grammar/noun`)} />
            <LessonButton
              index={3}
              title="How are You?"
              onClick={() => router.push(`/grammar/noun`)}
            />
            <LessonButton
              index={4}
              title="What is The Price of This?"
              onClick={() => router.push(`/grammar/noun`)}
            />
            <LessonButton
              index={5}
              title="What is The Time?"
              onClick={() => router.push(`/grammar/noun`)}
            />
            <LessonButton
              index={6}
              title="How Can I Help You?"
              onClick={() => router.push(`/grammar/noun`)}
            />
            <LessonButton
              index={7}
              title="Family Life"
              onClick={() => router.push(`/grammar/noun`)}
            />
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
