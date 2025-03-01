"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";


function page() {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  console.log(fileList);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
  {fileList?.length > 0 ? (
    fileList.map((file, index) => (
      <Link key={index} href={`/workspace/`+file.fileId}>
      <div
        key={index}
        className="border p-4 rounded-lg flex flex-col items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:scale-105"
      >
        <Image src={"/pdf.png"} alt="pdf" width={70} height={70} />
        <h2 className="text-2xl font-medium">{file.fileName}</h2>
        <p className="font-medium text-md mt-3 text-gray-400">
          {new Date(file._creationTime).toLocaleString()}
        </p>
      </div>
      </Link>
    ))
  ) : (
    [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
      <div
        key={index}
        className="bg-slate-300 border p-4 rounded-lg flex flex-col items-center justify-center shadow-md animate-pulse h-32 w-full"
      ></div>
    ))
  )}
</div>

  );
}

export default page;
