import Head from "next/head";
import React from "react";
import BlogsPageContainer from "../../containers/blogsPage";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>
      <main>
        <BlogsPageContainer />
      </main>
    </>
  );
}
