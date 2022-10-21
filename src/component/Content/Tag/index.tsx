import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { successToast, errorToast } from "../../../Toast";

import instance from "../../../Common/axios";

const EditTag = () => {
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
        .get(`/tag/${id}`)
        .then((res) => {
          setTitle(res.data.name);
          setValue("name", res.data.name);
          setValue("email", res.data.email);
        })
        .catch((err) => errorToast(err.code));
  }, []);

  const handleSave = (data: any) => {
    if (propagation === false)
      if (id !== "") {
        instance
          .put(`/tag/${id}`, {
            ...data,
          })
          .then(() => {
            successToast("Update successfully!");
            navigate(-1);
          })
          .catch((err) => errorToast(err.code));
      } else {
        instance
          .post(`/tag`, {
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
        .delete(`/tag/${id}`)
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
      <div className="ml-80 px-10 py-6">
        <div className="py-12">
          <div className="flex justify-between">
            <h1 className="text-3xl p-">{title || "Create an entry"}</h1>
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
          <div>Collection name: Tag </div>
        </div>
        <div>
          Name<span className="text-red-600">*</span>
        </div>
        <input
          {...register("name", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
        {errors.name?.type === "required" && (
          <p role="alert">Name is required</p>
        )}   
      </div>
    </form>
  );
};

export default EditTag;
