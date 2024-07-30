import React from "react";

// TODO(artur): Make better breakpoints.
export default function GrammarBookContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto mt-2 w-11/12 bg-white p-10 md:w-7/12">{children}</div>;
}
