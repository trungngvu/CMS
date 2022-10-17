import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import toastProps from "../../../Common/toastProps";
import instance from "../../../Common/axios";

const EditAuthor = ({ successToast, errorToast }: toastProps) => {
  const { register, handleSubmit, setValue } = useForm();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const id = useParams().id;

  useEffect(() => {
    instance
      .get(`/author/${id}`)
      .then((res) => {
        setTitle(res.data.name);
        setValue("name", res.data.name);
        setValue("email", res.data.email);
      })
      .catch((err) => errorToast(err.code));
  }, []);

  const handleSave = (data: any) => {
    instance
      .put(`/author/${id}`, {
        ...data,
      })
      .then(() => {
        successToast("Update successfully!");
        navigate(-1);
      })
      .catch((err) => errorToast(err.code));
  };

  const handleDelete = () => {
    instance
      .delete(`/author/${id}`)
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
                value="update"
                className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer"
              />
            </div>
          </div>
          <div>Collection name: Author</div>
        </div>
        <div>
          Name<span className="text-red-600">*</span>
        </div>
        <input
          {...register("name", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
        <div>
          Email<span className="text-red-600">*</span>
        </div>
        <input
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          className="border rounded"
          type={"text"}
        ></input>
      </div>
    </form>
  );
};

export default EditAuthor;
