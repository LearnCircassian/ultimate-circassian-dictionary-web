import React from "react";

export default function GrammarBookContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto mt-2 w-7/12 bg-white p-10">{children}</div>;
}
