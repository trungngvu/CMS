import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Editor from "../../Quill";
import instance from "../../../Common/axios";
import ArticleRelation from "./relation";
import toastProps from "../../../Common/toastProps";

const CreateArticle = ({ errorToast, successToast }: toastProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const [editorValue, setEditorValue] = useState("");
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    instance
      .post(`/article`, {
        ...data,
        content: editorValue,
      })
      .then((res) => {
        successToast("Create sucessfully");
        navigate(-1);
      })
      .catch((err) => errorToast(err.code));
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="ml-80 px-10 py-6">
        <div className="py-12">
          <div className="flex justify-between">
            <h1 className="text-3xl ">Create an entry</h1>

            <input
              type="submit"
              value="Save"
              className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer"
            />
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
        {errors.title?.type === "required" && (
          <p role="alert">Title is required</p>
        )}

        <div>
          Description<span className="text-red-600">*</span>
        </div>
        <input
          {...register("description", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
        {errors.description?.type === "required" && (
          <p role="alert">Description is required</p>
        )}

        <div className="py-10">
          <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
        </div>

        <div>
          Slug<span className="text-red-600">*</span>
        </div>
        <input
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
              message: "Invalid Slug",
            },
          })}
          className="border rounded"
          type={"text"}
        ></input>
        {formState.errors.slug?.message && (
          <p>
            <>{formState.errors.slug?.message}</>
          </p>
        )}
      </div>
    </form>
  );
};

export default CreateArticle;
