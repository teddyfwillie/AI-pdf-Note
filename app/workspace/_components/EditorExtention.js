import { useAction } from "convex/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Underline,
  Code,
  ListOrdered,
  Italic,
  Highlighter,
  Sparkles,
} from "lucide-react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "../../../configs/AIModel";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  if (!editor) {
    return null;
  }

  const { fileId } = useParams();

  const SearchAi = useAction(api.myActions.search);

  const onAiClick = async () => {
    // console.log("AI button click");
    toast("Answer loading...");

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    // console.log("selectedText", selectedText);

    const result = await SearchAi({
      query: selectedText,
      fileId: fileId,
    });
    // console.log("Unformatted Ans:", result);

    const UnformattedAnswers = JSON.parse(result);
    let AllUnformattedAnswers = "";
    UnformattedAnswers &&
      UnformattedAnswers.forEach((item) => {
        AllUnformattedAnswers = AllUnformattedAnswers + item.pageContent;
      });

    const PROMPT =
      "For question : " +
      selectedText +
      "and With the given content as answer," +
      "please give appropriate answer inHTML format. The answer content is:" +
      AllUnformattedAnswers;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());

    const FinalAns = AiModelResult.response
      .text()
      .replace("html", "")
      .replace("```", "");

    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + "<p><strong>Answer:</strong> " + FinalAns + "</p>"
    );
  };

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-2 flex-wrap">
          {/* Headings */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }
          >
            <Heading1 size={20} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }
          >
            <Heading2 size={20} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
            }
          >
            <Heading3 size={20} />
          </button>

          {/* Bold */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold size={20} />
          </button>

          {/* Italic */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic size={20} />
          </button>

          {/* Underline */}
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-500" : ""}
          >
            <Underline size={20} />
          </button>

          {/* Code */}
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "text-blue-500" : ""}
          >
            <Code size={20} />
          </button>
          {/* Highlight */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#fffa81" }).run()
            }
            className={editor.isActive("highlight") ? "text-blue-500" : ""}
          >
            <Highlighter size={20} />
          </button>

          {/* Ordered List */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-500" : ""}
          >
            <ListOrdered size={20} />
          </button>
          {/* Ordered List */}
          <button onClick={() => onAiClick()} className={"hover:text-blue-500"}>
            <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
