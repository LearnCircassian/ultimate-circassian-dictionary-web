import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import DictionaryContainer from "../../containers/homePage";

export default function DictionaryPage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <DictionaryContainer />
      </main>
    </>
  );
}
