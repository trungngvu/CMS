import { Outlet, Link } from "react-router-dom";
import Item from "./item";

import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 border-r">
        <Link to={"/"} className="h-12 mx-auto">
          Logo
        </Link>
        <hr className="text-gray-100" />
        <ul>
          <Link to="/write">
            <Item name="Viết bài" Vector={PencilSquareIcon} />
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
