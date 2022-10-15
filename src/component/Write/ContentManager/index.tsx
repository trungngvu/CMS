import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Table from "./table";
import instance from "../../../Common/axios";

const ContentManager = () => {
  const params = useParams();
  const category = params.category;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let api = "";
    if (category === "Trang chủ") api = "trangchu";
    else if (category === "Tin tức") api = "tintuc";
    else if (category === "Cập nhật") api = "capnhat";
    instance
      .get(`/${api}`)
      .then((res) => setTableData(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="ml-80 px-10 py-6">
      <div className="container ">
        <div className="pb-6">Back</div>
        <div className="flex justify-between">
          <div className="font-bold text-lg ">{category}</div>
          <Link
            to={`/write/${category}/create`}
            className="bg-blue-700 text-white pl-8 pr-4 py-2 rounded-md text-sm relative"
          >
            <span className="pr-4 text-xl font-bold absolute -translate-x-5 -translate-y-1 ">
              +
            </span>
            Create new entry
          </Link>
        </div>
        <div className="">{tableData.length} entries found</div>
      </div>
      <div className="py-4">Search Filter </div>
      <Table data={tableData} />
    </div>
  );
};

export default ContentManager;
