"use client";

import { useParams } from "next/navigation";
import WorkspaceHeader from "../_components/workspaceHeader";
import React, { useEffect } from "react";
import PdfViewer from "../_components/PdfViewer";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

function workspace() {
  const { fileId } = useParams();

  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);

  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-4 p-5">
        <div>{/* PDF Vierwer */}</div>
        <div>
          {/* Text Editor */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default workspace;
