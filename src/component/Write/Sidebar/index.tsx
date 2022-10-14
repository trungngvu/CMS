import SidebarItems from "./items";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const WriteSidebar = () => {
  const [pages, setPages] = useState(["Trang chủ", "Tin tức", "Cập nhật"]);

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
