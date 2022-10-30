import { useState } from 'react';
import SidebarItem from './item';

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
    return (
        <>
            {items.map((item, index) => {
                return <SidebarItem name={item.name} Icon={item.Icon} key={index} />;
            })}
        </>
    );
};

export default SidebarItems;
