import { Link } from "react-router-dom";

interface vectorprops {
  className?: string;
}

interface props {
  name: string;
  Icon: React.FC<vectorprops>;
  setActiveContent: React.Dispatch<React.SetStateAction<string>>;
  activeContent: string;
}

const SidebarItem = ({
  activeContent,
  setActiveContent,
  name,
  Icon,
}: props) => {
  let styleContent =
    "grid grid-cols-3 px-2 py-2 hover:bg-blue-100 cursor-pointer hover:rounded hover:font-bold m-1 font-medium";
  if (activeContent === name) {
    styleContent = "grid grid-cols-3 px-2 py-2 m-1 bg-blue-100 rounded-lg font-bold";
  }

  return (
    <Link to={`/write/${name}`}>
      <li
        onClick={() => {
          setActiveContent(name);
        }}
        className={styleContent}
      >
        <span className="px-4 col-span-2 capitalize text-center text-blue-800 text-sm ">
          {name}
        </span>
        <Icon className="h-6 w-6 justify-self-center col-span-1 text-blue-800 text-sm	" />
      </li>
    </Link>
  );
};

export default SidebarItem;
