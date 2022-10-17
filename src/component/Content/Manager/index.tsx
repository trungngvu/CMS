import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import Table from "./table";
import instance from "../../../Common/axios";
import toastProps from "../../../Common/toastProps";

const ContentManager = ({ errorToast }: toastProps) => {
  const [tableData, setTableData] = useState([]);
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
      .catch((err) => errorToast(err.code));
  }, [api]);

  return (
    <div className="ml-80 px-10 py-6">
      <div className="container ">
        <div className="pb-6">Back</div>
        <div className="flex justify-between">
          <div className="font-bold text-lg capitalize">{api}</div>
          <Link
            to={`/write/${api}/create`}
            className="bg-blue-700 text-white pl-8 pr-4 py-2 rounded-md text-sm relative"
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
