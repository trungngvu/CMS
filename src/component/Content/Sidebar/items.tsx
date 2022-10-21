import { useState } from "react";
import SidebarItem from "./item";

interface vectorprops {
  className?: string;
}

interface props {
  items: {
    name: string;
    Icon: React.FC<vectorprops>;
  }[];
}
const SidebarItems = ({ items }: props) => {
  const [activeContent, setActiveContent] = useState("");
  return (
    <>
      {items.map((item, index) => {
        return <SidebarItem activeContent={activeContent} setActiveContent={setActiveContent} name={item.name} Icon={item.Icon} key={index} />;
      })}
    </>
  );
};

export default SidebarItems;
