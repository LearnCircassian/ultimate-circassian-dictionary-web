import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import HomePageContainer from "../containers/homePage";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Jeet.so</title>
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
