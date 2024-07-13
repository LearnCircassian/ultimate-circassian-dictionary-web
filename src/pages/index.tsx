import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import HomePageContainer from "../containers/homePage";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Ultimate Circassian Dictionary</title>
      </Head>
      <main>
        <HomePageContainer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
