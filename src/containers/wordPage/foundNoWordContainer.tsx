import React from "react";

export default function FoundNoWordContainer() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="border-gray-700 rounded-lg border p-6 shadow-lg">
        <h2 className="text-4xl font-bold text-white">Word not found</h2>
      </div>
    </div>
  );
}
