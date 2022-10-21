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

const SidebarItem = ({activeContent, setActiveContent, name, Icon }: props) => {
  let styleContent = "grid grid-cols-3 pt-2 pb-0 hover:bg-gray-300 cursor-pointer hover:scale-110 hover:rounded text-right"
  if(activeContent === name)
  {
    styleContent += " m-1 bg-blue-100 rounded-lg font-medium"
  }

  return (
    <Link to={`/write/${name}`}>
      <li onClick={()=>{setActiveContent(name)}} className={styleContent}>
        <span className="px-4 col-span-2 capitalize h-12 text-center text-blue-800">{name}</span>
        <Icon className="h-6 w-6 justify-self-center col-span-1 text-blue-800" />
      </li>
    </Link>
  );
};

export default SidebarItem;
