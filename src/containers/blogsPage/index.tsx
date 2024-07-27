import React from "react";
import { useRouter } from "next/navigation";

interface IBlog {
  title: string;
  description: string;
  image: string;
  id: number;
}

const BLOGS_LIST: IBlog[] = [
  {
    title: "Referring to your father as third person in Adyghebze is distressful",
    description: "",
    image: "",
    id: 0,
  },
  {
    title: "Circassian could had gender distinguishing pronouns",
    description: "",
    image: "",
    id: 1,
  },
];

export default function BlogsPageContainer() {
  const router = useRouter();
  return (
    <div className="mx-auto mt-2 flex w-11/12 flex-col gap-2">
      <input
        className="mx-auto min-w-[400px] rounded-md border border-solid border-black p-4"
        placeholder="Search topic"
      />
      {BLOGS_LIST.map((blog, idx) => {
        return (
          <div
            onClick={() => router.push(`/blogs/${blog.id}`)}
            key={blog.title}
            className="flex flex-row items-center justify-between rounded-2xl bg-indigo-600/20 p-4 text-2xl shadow hover:cursor-pointer hover:bg-indigo-600/30 hover:underline"
          >
            <h2>
              {idx}. {blog.title}
            </h2>
            <h2 className="text-3xl text-blue-600">Link</h2>
          </div>
        );
      })}
    </div>
  );
}
