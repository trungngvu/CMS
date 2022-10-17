import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import toastProps from "../../../Common/toastProps";
import Editor from "../../Quill";
import instance from "../../../Common/axios";

const EditArticle = ({ successToast, errorToast }: toastProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
  } = useForm();
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
      .catch((err) => errorToast(err.code));
  }, []);

  const handleSave = (data: any) => {
    instance
      .put(`/article/${id}`, {
        ...data,
        content: editorValue,
      })
      .then(() => {
        successToast("Update successfully!");
        navigate(-1);
      })
      .catch((err) => errorToast(err.code));
  };

  const handleDelete = () => {
    instance
      .delete(`/article/${id}`)
      .then(() => {
        successToast("Delete successfully!");
        navigate(-1);
      })
      .catch((err) => errorToast(err.code));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleSave);
      }}
    >
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
                value="Update"
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
          <div>Content</div>
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

export default EditArticle;
