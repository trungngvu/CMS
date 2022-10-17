import { Link } from "react-router-dom";

interface vectorprops {
  className?: string;
}

interface props {
  name: string;
  Icon: React.FC<vectorprops>;
}

const SidebarItem = ({ name, Icon }: props) => {
  return (
    <Link to={`/write/${name}`}>
      <li className="grid grid-cols-3 py-3 hover:bg-gray-300 cursor-pointer hover:scale-110 hover:rounded">
        <span className="px-4 col-span-2 capitalize">{name}</span>
        <Icon className="h-6 w-6 justify-self-center col-span-1" />
      </li>
    </Link>
  );
};

export default SidebarItem;
