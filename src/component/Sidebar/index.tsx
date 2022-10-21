import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import Item from "./item";


export default function Sidebar() {
  const [active, setActive] = useState("");
  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 border-r">
        <Link to={"/"} className="h-12 mx-auto">
          <div className="px-4 col-span-2 capitalize h-12 text-center text-blue-800 font-bold pt-2.5 hover:scale-110">Đây là LOGO</div>

        </Link>
        <hr className="text-gray-100" />
        <ul>
          <Link to="/write">
            <Item active={active} setActive={setActive} name="Content" Vector={PencilSquareIcon} />
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
