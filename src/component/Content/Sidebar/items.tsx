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
    close: () => void;
}
const SidebarItems = ({ items, close }: props) => {
    return (
        <>
            {items.map((item, index) => {
                return <SidebarItem close={close} name={item.name} Icon={item.Icon} key={index} />;
            })}
        </>
    );
};

export default SidebarItems;
