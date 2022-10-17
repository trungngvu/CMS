import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toastProps from "../../../Common/toastProps";

import instance from "../../../Common/axios";

const CreateCategory = ({ errorToast, successToast }: toastProps) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    instance
      .post(`/category`, {
        ...data,
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
            <h1 className="text-3xl">Create an entry</h1>
            <input
              type="submit"
              value="Save"
              className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer"
            />
          </div>
          <div>Collection name: Category</div>
        </div>
        <div>
          Title<span className="text-red-600">*</span>
        </div>
        <input
          {...register("name", { required: true })}
          className="border rounded"
          type={"text"}
        ></input>
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

export default CreateCategory;
