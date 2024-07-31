import React from "react";

// TODO(artur): Make better breakpoints.
export default function GrammarBookContainer({ children }: { children: React.ReactNode }) {
  return <div className="md m-2 mx-auto w-[97%] bg-white p-4 md:max-w-screen-md">{children}</div>;
}
