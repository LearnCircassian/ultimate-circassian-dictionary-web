import React from "react";
import useModal from "~/hooks/useModal";

export default function HomePageContainer() {
  return (
    <main className="relative -z-10 mx-auto mt-4 flex w-11/12 flex-col items-center justify-center gap-4">
      <div
        className="pointer-events-none absolute top-[-50px] z-0 h-[1000px] w-[1152px]"
        style={{
          backgroundImage: "url('/homePage/homePageBg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="to-background pointer-events-none absolute top-[300px] z-20 h-screen w-screen bg-gradient-to-b from-transparent" />
      <div className="absolute top-[648px] z-30 flex flex-col items-center justify-center gap-8">
        <h1 className="mx-auto text-7xl font-semibold text-black">
          Archive and access Influencer calls
        </h1>
        <h2 className="mx-auto text-3xl font-medium text-black">
          Don’t listen to KOLs blindly, always check their previous performance
        </h2>
      </div>
    </main>
  );
}
