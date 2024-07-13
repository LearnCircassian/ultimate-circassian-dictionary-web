import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchWordDefinitions } from "~/requests";
import { WordObject } from "~/interfaces";
import FoundNoWordContainer from "~/containers/wordPage/foundNoWordContainer";
import WordPageContainer from "~/containers/wordPage";

export interface WordPageProps {
  wordDefinitions: WordObject[] | null;
  wordSpelling: string;
}

export default function ProfilePage({ wordSpelling, wordDefinitions }: WordPageProps) {
  if (!wordSpelling || !wordDefinitions || wordDefinitions.length === 0) {
    return (
      <>
        <Head>
          <title>Ultimate Circassian Dictionary</title>
        </Head>
        <main>
          <FoundNoWordContainer />;
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Ultimate Circassian Dictionary</title>
      </Head>
      <main>
        <p>Hello</p>
        <WordPageContainer wordSpelling={wordSpelling} wordDefinitions={wordDefinitions} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}): Promise<{ props: WordPageProps }> => {
  const word = Array.isArray(params?.word) ? params?.word?.[0] : params?.word;

  if (!word || word.trim().length === 0) {
    return { props: { wordSpelling: "", wordDefinitions: null } };
  }

  const wordObjectRes = await fetchWordDefinitions(word);
  if (wordObjectRes.isErr()) {
    return { props: { wordSpelling: word, wordDefinitions: null } };
  }

  return { props: { wordSpelling: word, wordDefinitions: wordObjectRes.value } };
};
