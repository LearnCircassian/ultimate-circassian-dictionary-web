import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import FoundNoWordContainer from "~/containers/wordPage/foundNoWordContainer";

export default function WordPage() {
  return (
    <>
      <Head>
        <title>Ultimate Circassian Dictionary</title>
      </Head>
      <main>
        <FoundNoWordContainer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
