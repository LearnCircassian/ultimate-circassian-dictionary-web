import Head from "next/head";
import React from "react";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Learn Circassian</title>
      </Head>

      <div className="flex min-h-screen justify-center bg-white">
        <div className="mt-20 flex h-40 w-full items-center justify-center bg-green-600 py-4 text-center text-white">
          <h1 className="relative text-3xl font-bold text-yellow-500">
            {/* this is a cheap hack to avoid using a custom tailwind style. The idea is to achieve a black outline for better contrast.*/}
            <span className="text-shadow-lg absolute inset-0 text-black">
              Welcome to Learn Circassian! The future website for learning Circassian.
            </span>
            <span className="relative">
              Welcome to Learn Circassian! The future website for learning Circassian.
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
