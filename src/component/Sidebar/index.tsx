import { Outlet, Link } from "react-router-dom";
import Item from "./item";

import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 border-r">
        <Link to={"/"} className="h-12 mx-auto">
          <img
            src="https://batgroup.vn/wp-content/uploads/2020/05/logo-batgroup.vn_.png"
            className="h-full py-1 hover:scale-110 hover:rounded"
          />
        </Link>
        <hr className="text-gray-100" />
        <ul>
          <Link to="/write">
            <Item name="Content" Vector={PencilSquareIcon} />
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
