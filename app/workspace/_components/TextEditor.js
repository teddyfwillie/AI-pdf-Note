import React, { useEffect } from "react";
import EditorExtention from "./EditorExtention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  // console.log(notes);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph", "heading", "code_block"],
      }),
      Strike,
      BulletList,
      OrderedList,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    editorProps: {
      immediatelyRender: false, // Disable SSR
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes && editor]);

  // used to get Notes stored in DB

  const GetNotes = () => {};

  return (
    <div>
      <EditorExtention editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
