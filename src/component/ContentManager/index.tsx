import { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "./table";

const ContentManager = () => {
  const [tableData, setTableDate] = useState([
    {
      id: 1,
      title: "bai1",
      createAt: "Wednesday, October 5, 2022 at 11:08 AM",
      updateAt: "Friday, October 7, 2022 at 10:36 AM",
      state: "Published",
    },
    {
      id: 2,
      title: "bai1",
      createAt: "Wednesday, October 5, 2022 at 11:08 AM",
      updateAt: "Friday, October 7, 2022 at 10:36 AM",
      state: "Published",
    },
  ]);

  const categoryId = useParams();
  console.log(categoryId);

  return (
    <div className="ml-80 px-10 py-6">
      <div className="container ">
        <div className="pb-6">Back</div>
        <div className="flex justify-between">
          <div className="font-bold text-lg ">Tintuc</div>
          <button className="bg-blue-700 text-white pl-8 pr-4 py-2 rounded-md text-sm relative">
            <span className="pr-4 text-xl font-bold absolute -translate-x-5 -translate-y-1 ">
              +
            </span>
            Create new entry
          </button>
        </div>
        <div className="">2 entries found</div>
      </div>
      <div className="py-4">Search Filter</div>
      <Table data={tableData} />
    </div>
  );
};

export default ContentManager;
