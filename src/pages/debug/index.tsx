import Head from "next/head";
import React from "react";
import type { GetServerSideProps } from "next";
import DebugPageContainer from "~/containers/debugPage";

interface HomePageProps {
  host: string | null;
}

export default function DebugPage({ host }: HomePageProps) {
  if (!host?.toLowerCase().includes("localhost")) {
    return (
      <>
        <Head>
          <title>Jeet.so</title>
        </Head>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Jeet.so</title>
      </Head>
      <main>
        <DebugPageContainer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { host: context.req.headers.host || null } };
};
