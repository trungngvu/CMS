import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { ImageResize } from "quill-image-resize-module--fix-imports-error";

interface props {
  setEditorValue: (value: string) => void;
  editorValue: string;
}

export default function Editor({ editorValue, setEditorValue }: props) {
  // Quill.register("modules/imageResize", ImageResize);
  const modules = {
    toolbar: [
      [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
    // imageResize: { modules: ["Resize", "DisplaySize"] },
  };

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={editorValue}
      onChange={(e) => setEditorValue(e)}
    />
  );
}
