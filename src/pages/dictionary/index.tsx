import Head from "next/head";
import React from "react";
import DictionaryContainer from "../../containers/dictionaryPage";

export default function DictionaryPage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main className="w-full">
        <DictionaryContainer />
      </main>
    </>
  );
}
