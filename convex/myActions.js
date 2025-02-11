import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";

import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(), // Expecting an array but can be any type
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const textArray = Array.isArray(args.splitText)
      ? args.splitText
      : [args.splitText];

    await ConvexVectorStore.fromTexts(
      textArray, // Ensure this is always an array
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    return "completed";
  },
});
