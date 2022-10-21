import SidebarItems from "./items";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { TagIcon } from "@heroicons/react/24/solid";
import { NewspaperIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
const WriteSidebar = () => {
  const [pages, setPages] = useState([
    {
      name: "article",
      Icon: NewspaperIcon,
    },
    {
      name: "category",
      Icon: TagIcon,
    },
    {
      name: "author",
      Icon: UserCircleIcon,
    },
  ]);

  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 border-r ml-40 bg-blue-50">
        <div className="h-12 text-center text-blue-800 font-medium pt-2.5 text-xl">Content</div>
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
