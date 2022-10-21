import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { successToast, errorToast } from "../../../Toast";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import Editor from "../../Quill";
import instance from "../../../Common/axios";
import ArticleRelation from "./relation";
import { DEFAULT_MAX_VERSION } from "tls";

const EditArticle = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
  } = useForm();
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");

  //Relation data
  const [category, setCategory] = useState<
    {
      createAt: string;
      id: string;
      name: string;
      updateAt: string;
      slug: string;
    }[]
  >([]);
  const [author, setAuthor] = useState<
    {
      createAt: string;
      id: string;
      name: string;
      updateAt: string;
      email: string;
    }[]
  >([]);
  const [tag, setTag] = useState<
    {
      createAt: string;
      id: string;
      name: string;
      updateAt: string;
    }[]
  >([]);
  //Relation value
  const [relation, setRelation] = useState({
    category: "",
    author: "",
    tag: [""],
  });

  const [propagation, stopPropagation] = useState(false);
  const navigate = useNavigate();

  const id = useParams().id || "";

  useEffect(() => {
    id !== "" &&
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
    instance
      .get("/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => errorToast(err.code));
    instance
      .get("/author")
      .then((res) => {
        setAuthor(res.data);
      })
      .catch((err) => errorToast(err.code));
    instance
      .get("/tag")
      .then((res) => {
        setTag(res.data);
      })
      .catch((err) => errorToast(err.code));
  }, []);

  const handleSave = (data: any) => {
    if (propagation === false)
      if (id !== "") {
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
      } else {
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
      }
  };

  const handleDelete = () => {
    stopPropagation(true);
    if (id !== "")
      instance
        .delete(`/article/${id}`)
        .then(() => {
          successToast("Delete successfully!");
          navigate(-1);
        })
        .catch((err) => errorToast(err.code));
    else {
      successToast("Delete successfully!");
      navigate(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="ml-80 px-10 py-6 bg-blue-50">
        <div className="py-12">
          <div className="flex justify-between">
            <h1 className="text-3xl text-blue-800 font-medium">
              {title || "Create an entry"}
            </h1>
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
          <div className="text-blue-600 font-medium">Article</div>
        </div>

        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <div>
              <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                Title<span className="text-red-600"> *</span>
              </div>
              <input
                {...register("title", { required: true })}
                className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
                type={"text"}
              ></input>
              {errors.title?.type === "required" && (
                <p role="alert" className="text-red-600 italic text-sm mt-1">
                  <ExclamationTriangleIcon className="w-4 inline" /> Title is
                  required
                </p>
              )}
            </div>

            <div>
              <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                Description<span className="text-red-600"> *</span>
              </div>
              <input
                {...register("description", { required: true })}
                className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
                type={"text"}
              ></input>
              {errors.description?.type === "required" && (
                <p role="alert" className="text-red-600 italic text-sm mt-1">
                  <ExclamationTriangleIcon className="w-4 inline" /> Description
                  is required
                </p>
              )}
            </div>

            <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
              Slug<span className="text-red-600"> *</span>
            </div>
            <input
              {...register("slug", {
                required: "Slug is required",
                pattern: {
                  value: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
                  message: "Invalid Slug",
                },
              })}
              className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
              type={"text"}
            ></input>
            {formState.errors.slug?.message && (
              <p className="text-red-600 italic	text-sm mt-1">
                <>
                  <ExclamationTriangleIcon className="w-4 inline" />
                  {formState.errors.slug?.message}
                </>
              </p>
            )}
          </div>

          <div>
            <ArticleRelation
              category={category}
              author={author}
              tag={tag}
              relation={relation}
              setRelation={setRelation}
            ></ArticleRelation>
          </div>
        </div>

        <div className="py-10">
          <div className="mb-2 cursor-pointer text-blue-800 font-medium hover:underline w-fix">
            Content
          </div>
          <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
        </div>
      </div>
    </form>
  );
};

export default EditArticle;
