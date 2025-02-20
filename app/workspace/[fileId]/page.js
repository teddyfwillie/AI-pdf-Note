"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import PdfViewer from "../_components/PdfViewer";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import TextEditor from "../_components/TextEditor";
import WorkspaceHeader from "../_components/WorkspaceHeader";

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
      <WorkspaceHeader fileName={fileInfo?.fileName} />
      <div className="grid grid-cols-2 gap-4 p-5">
        <div>
          {/* PDF Vierwer */}
          <TextEditor fileId={fileId} />
        </div>
        <div>
          {/* Text Editor */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default workspace;
