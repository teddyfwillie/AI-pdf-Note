import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { NextResponse } from "next/server";

// const pdfUrl =
//   "https://adept-marmot-953.convex.cloud/api/storage/feb5af36-65d9-407a-bf35-b72a2e075f6d";

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");

  console.log(pdfUrl);

  // 1. Fetch the PDF file
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loaser = new WebPDFLoader(data);
  const docs = await loaser.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });

  // 2. split the text content into words
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
  });

  const output = await textSplitter.splitText(pdfTextContent);

  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: pdfTextContent });
}
