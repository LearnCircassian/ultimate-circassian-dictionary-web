import React from "react";

export default function FoundNoWordContainer() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="rounded-lg border border-gray-700 p-6 shadow-lg">
        <h2 className="text-4xl font-bold text-white">Word not found</h2>
      </div>
    </div>
  );
}
