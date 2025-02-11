"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);

  const embeddDocument = useAction(api.myActions.ingest);

  const { user } = useUser();
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const OnFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("Uploaded file to storageId", storageId);

    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });

    // // Step 3: Save the newly allocated storage id to the database
    const response = await AddFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "untitled file",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(response);

    // API call to Fetch PDF Process Data

    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResp.data.result);

    // Embed Document
    await embeddDocument({
      splitText: ApiResp.data.result,
      fileId: fileId,
    });
    // console.log(embdeddResult);

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full">
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-5">
              <h2>Select a file to Upload</h2>
              <div className="flex p-3 gap-2 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => OnFileSelect(e)}
                />
              </div>
              <div>
                <label>File Name</label>
                <Input
                  placeholder="File Name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
