import { useState } from "react";
import { useForm } from "react-hook-form";

import Editor from "../../Quill";
import instance from "../../../Common/axios";

const CreateArticle = () => {
  const { register, handleSubmit } = useForm();
  const [editorValue, setEditorValue] = useState("");

  const handleSave = (data:any) => {
    instance
      .post(`/article`, {
        ...data,
        content: editorValue,
      })
      .then((res) => console.log("POST Success"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="ml-80 px-10 py-6">
        <div className="py-12">
          <div className="flex justify-between">
            <h1 className="text-3xl p-">Create an entry</h1>
            <input
              type="submit"
              value="Save"
              className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer"
            />
          </div>
          <div>Collection name: article</div>
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

export default CreateArticle;
