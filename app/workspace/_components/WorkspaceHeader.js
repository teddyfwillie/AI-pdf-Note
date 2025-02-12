import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

function WorkspaceHeader() {
  return (
    <div className="flex justify-between items-center p-4 shadow-md">
      <Image src={"/logo.svg"} alt="logo" width={140} height={100} />
      <UserButton />
    </div>
  );
}

export default WorkspaceHeader;
