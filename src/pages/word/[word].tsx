import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import WordPageContainer from "~/containers/wordPage";
import { useParams } from "next/navigation";
import { regularWordToSafeWord, safeWordToRegularWord } from "~/utils/safeWords";

export default function WordPage() {
  const { word: safeWord } = useParams<{ word: string }>();
  const wordSpelling = safeWordToRegularWord(safeWord);

  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <WordPageContainer wordSpelling={wordSpelling} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
