import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Table from "./table";
import instance from "../../../Common/axios";

const ContentManager = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  //get last path of the URL
  const location = useLocation();
  const api = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
    location.pathname.length
  );

  useEffect(() => {
    instance
      .get(`/${api}`)
      .then((res) => setTableData(res.data))
      .catch((err) => toast.error(err.code));
  }, [api]);

  return (
    <div className="ml-80 px-10 py-6 min-h-screen h-full bg-blue-50">
      <div className="container">
        <div
          className="mb-6 cursor-pointer text-blue-800 font-medium hover:underline w-fix"
          onClick={() => navigate(-1)}
        >
          &crarr; Back
        </div>
        <div className="flex justify-between">
          <div className="font-bold text-lg capitalize text-blue-800">
            {api}
          </div>
          <Link
            to={`/write/${api}/create`}
            className="bg-blue-800 text-white pl-8 pr-4 py-2 rounded-md text-sm relative hover:scale-110"
          >
            <span className="pr-4 text-xl font-bold absolute -translate-x-5 -translate-y-1 ">
              +
            </span>
            Create new entry
          </Link>
        </div>

        <div className="">{tableData.length || 0} entries found</div>
      </div>
      <div className="py-4">Search Filter </div>
      {tableData.length !== 0 && <Table data={tableData} />}
    </div>
  );
};

export default ContentManager;
