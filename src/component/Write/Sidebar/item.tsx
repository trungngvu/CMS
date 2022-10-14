import { Link } from "react-router-dom";

const SidebarItem = ({ name }: { name: string }) => {
  return (
    <Link to={`/write?${name}`}>
      <li className="p-4 hover:bg-gray-200">{name}</li>
    </Link>
  );
};

export default SidebarItem;
