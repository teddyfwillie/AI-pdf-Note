import React, { useEffect } from "react";
import EditorExtention from "./EditorExtention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  // console.log(notes);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    editorProps: {
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
