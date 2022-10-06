import { Link, Outlet } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
export default function Sidebar() {
  return (
    <>
      <nav className="w-40 flex flex-col h-screen fixed top-0 left-0 shadow-xl">
        <div className="h-12 mx-auto">Logo</div>
        <hr className="text-gray-100" />
        <ul>
          <li className="grid grid-cols-3 py-3 hover:bg-gray-300 cursor-pointer">
            <span className="justify-self-center col-span-2">Viết Bài</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 justify-self-center col-span-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
