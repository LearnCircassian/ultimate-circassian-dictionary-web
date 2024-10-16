import Head from "next/head";
import React from "react";
import { useRouter } from "next/navigation";
import ContainerDiv from "~/components/containerDiv";

export default function GrammarPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <ContainerDiv className="p-4">
          <div className="flex flex-col gap-4">
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/noun`)}
            >
              Nouns
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/verb`)}
            >
              Verbs
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/phonology`)}
            >
              Phonology
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/morphology`)}
            >
              Morphology
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/number`)}
            >
              Numbers
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/adverb`)}
            >
              Adverbs
            </p>
            <p
              className="cursor-pointer text-3xl font-bold text-blue-600 hover:underline"
              onClick={() => router.push(`/grammar/adjective`)}
            >
              Adjectives
            </p>
          </div>
        </ContainerDiv>
      </main>
    </>
  );
}
