import { useParams } from "react-router-dom";
import { useState } from "react";

import Editor from "../../Quill";
import instance from "../../../Common/axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const category = useParams().category;

  const handleSave = () => {
    let api = "";
    if (category === "Trang chủ") api = "trangchu";
    else if (category === "Tin tức") api = "tintuc";
    else if (category === "Cập nhật") api = "capnhat";
    instance
      .post(`/${api}`, {
        title: title,
        content: editorValue,
      })
      .then((res) => console.log("POST Success"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ml-80 px-10 py-6">
      <div className="py-12">
        <div className="flex justify-between">
          <h1 className="text-3xl p-">Create an entry</h1>
          <button
            onClick={handleSave}
            className="bg-blue-700 text-white px-4 rounded-md text-sm relative"
          >
            Save
          </button>
        </div>
        <div>Category: {category}</div>
      </div>
      <form>
        <div>Title</div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded"
          type={"text"}
          required
        ></input>
      </form>
      <div className="py-10">
        <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
      </div>
    </div>
  );
};

export default Create;
