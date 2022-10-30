import { Outlet, Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import Item from "./item";

export default function Sidebar() {
  return (
    <>
      <nav className="w-40 flex flex-col min-h-screen h-full fixed top-0 left-0 border-r">
        <Link to={"/"} className="h-12 mx-auto">
          <div className="px-4 col-span-2 capitalize h-12 text-center text-blue-800 font-bold pt-2.5 hover:scale-110">
            Đây là LOGO
          </div>
        </Link>
        <hr className="text-gray-100" />
        <ul>
            <Item
              name="content"
              Vector={PencilSquareIcon}
            />
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
