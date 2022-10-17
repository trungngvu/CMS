import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Editor from "../../Quill";
import instance from "../../../Common/axios";

const EditArticle = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");

  const id = useParams().id;

  useEffect(() => {
    instance
      .get(`/article/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        setValue("slug", res.data.slug);
        setEditorValue(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (data: any) => {
    instance
      .put(`/article/${id}`, {
        ...data,
        content: editorValue,
      })
      .then(() => console.log("PUT success"))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    instance
      .delete(`/article/${id}`)
      .then(() => console.log("Delete Success"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
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
              <input
                type="submit"
                value="Save"
                className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer"
              />
            </div>
          </div>
          <div>Collection name: Article</div>
        </div>
        <div>
          Title<span className="text-red-600">*</span>
        </div>
        <input
          {...register("title", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
        <div>
          Description<span className="text-red-600">*</span>
        </div>
        <input
          {...register("description", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
        <div className="py-10">
          <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
        </div>
        <div>
          Slug<span className="text-red-600">*</span>
        </div>
        <input
          {...register("slug", {
            required: true,
            pattern: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
          })}
          className="border rounded"
          type={"text"}
        ></input>
      </div>
    </form>
  );
};

export default EditArticle;
