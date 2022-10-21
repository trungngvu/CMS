import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { successToast, errorToast } from "../../../Toast";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import instance from "../../../Common/axios";

const EditCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
  } = useForm();
  const [title, setTitle] = useState("");
  const [propagation, stopPropagation] = useState(false);
  const navigate = useNavigate();

  const id = useParams().id || "";

  useEffect(() => {
    id !== "" &&
      instance
        .get(`/category/${id}`)
        .then((res) => {
          setTitle(res.data.name);
          setValue("name", res.data.name);
          setValue("slug", res.data.slug);
        })
        .catch((err) => errorToast(err.code));
  }, []);

  const handleSave = (data: any) => {
    if (propagation === false)
      if (id !== "") {
        instance
          .put(`/category/${id}`, {
            ...data,
          })
          .then(() => {
            successToast("Update successfully!");
            navigate(-1);
          })
          .catch((err) => errorToast(err.code));
      } else {
        instance
          .post(`/category`, {
            ...data,
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
        .delete(`/category/${id}`)
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
      <div className="ml-80 px-10 py-6 bg-blue-50 h-screen">
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
          <div className="text-blue-600 font-medium">Category</div>
        </div>
        <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
          Name<span className="text-red-600"> *</span>
        </div>
        <input
          {...register("name", { required: true })}
          className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-2/5 h-7"
          type={"text"}
        ></input>
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-600 italic text-sm mt-1">
            <ExclamationTriangleIcon className="w-4 inline" /> Name is required
          </p>
        )}
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
          className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-2/5 h-7"
          type={"text"}
        ></input>
        {formState.errors.slug?.message && (
          <p role="alert" className="text-red-600 italic text-sm mt-1">
            <ExclamationTriangleIcon className="w-4 inline" /> Slug is required
          </p>
        )}
      </div>
    </form>
  );
};

export default EditCategory;
