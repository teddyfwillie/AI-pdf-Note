import { useAction, useMutation } from "convex/react";
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
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Link,
  Strikethrough,
  Quote,
} from "lucide-react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "../../../configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditorExtension({ editor }) {
  if (!editor) {
    return null;
  }

  const { fileId } = useParams();

  const SearchAi = useAction(api.myActions.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  const onAiClick = async () => {
    toast("Answer loading...");

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    const result = await SearchAi({
      query: selectedText,
      fileId: fileId,
    });

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

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user.primaryEmailAddress?.emailAddress,
    });
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

          {/* Text Formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-500" : ""}
          >
            <Underline size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "text-blue-500" : ""}
          >
            <Strikethrough size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "text-blue-500" : ""}
          >
            <Code size={20} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#fffa81" }).run()
            }
            className={editor.isActive("highlight") ? "text-blue-500" : ""}
          >
            <Highlighter size={20} />
          </button>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-500" : ""}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-500" : ""}
          >
            <ListOrdered size={20} />
          </button>

          {/* Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
            }
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
            }
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
            }
          >
            <AlignRight size={20} />
          </button>

          {/* Block Elements */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "text-blue-500" : ""}
          >
            <Quote size={20} />
          </button>

          {/* Media */}
          <button
            onClick={() => {
              const url = window.prompt("Enter the image URL");
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <Image size={20} />
          </button>
          <button
            onClick={() => {
              const url = window.prompt("Enter the URL");
              if (url) {
                editor.chain().focus().toggleLink({ href: url }).run();
              }
            }}
          >
            <Link size={20} />
          </button>

          {/* AI Integration */}
          <button onClick={() => onAiClick()} className={"hover:text-blue-500"}>
            <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
