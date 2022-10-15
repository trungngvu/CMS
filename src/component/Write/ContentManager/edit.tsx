import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Editor from "../../Quill";
import instance from "../../../Common/axios";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const category = useParams().category;
  const id = useParams().id;

  let api = "";
  if (category === "Trang chủ") api = "trangchu";
  else if (category === "Tin tức") api = "tintuc";
  else if (category === "Cập nhật") api = "capnhat";
  useEffect(() => {
    instance
      .get(`/${api}/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setEditorValue(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = () => {
    instance
      .put(`/${api}/${id}`, {
        title: title,
        content: editorValue,
      })
      .then(() => console.log("PUT success"))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    instance
      .delete(`/${api}/${id}`)
      .then(() => console.log("Delete Success"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ml-80 px-10 py-6">
      <div className="py-12">
        <div className="flex justify-between">
          <h1 className="text-3xl p-">{title}</h1>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 rounded-md text-sm relative"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-700 text-white px-4 rounded-md text-sm relative"
            >
              Update
            </button>
          </div>
        </div>
        <div>Category: {category}</div>
      </div>
      <form className="py-10">
        <div>Title</div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border rounded"
          type={"text"}
        ></input>
      </form>
      <div className="py-10">
        <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
      </div>
    </div>
  );
};

export default Edit;
