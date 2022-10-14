import SidebarItems from "./items";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/24/solid"; 
import { NewspaperIcon } from "@heroicons/react/24/solid"; 
import { ArrowPathIcon } from "@heroicons/react/24/solid"; 
const WriteSidebar = () => {
  const [pages, setPages] = useState([
    {
      name: "Trang chủ",
      Icon: HomeIcon
    },
    {
      name: "Tin tức",
      Icon: NewspaperIcon
    },
    {
      name: "Cập nhật",
      Icon: ArrowPathIcon
    }
  ]);

  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 border-r ml-40">
        <div className="h-12 text-center">Page</div>
        <hr className="text-gray-100 w-8 ml-3" />
        <ul>
            <SidebarItems items={pages} />
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default WriteSidebar;
