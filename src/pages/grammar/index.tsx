import Head from "next/head";
import HomePageContainer from "~/containers/homePage";
import React from "react";

export default function GrammarPage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <HomePageContainer />
      </main>
    </>
  );
}
