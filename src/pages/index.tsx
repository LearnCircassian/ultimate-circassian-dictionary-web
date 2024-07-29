import Head from "next/head";
import React from "react";
import DictionaryShowContainer from "~/containers/dictionaryPage";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main className="w-full">
        <DictionaryShowContainer />
      </main>
    </>
  );
}
