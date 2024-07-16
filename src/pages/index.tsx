import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import HomePageContainer from "../containers/homePage";

export default function HomePage() {
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
