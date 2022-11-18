import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { TagIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';

import SidebarItems from './items';
const ContentSidebar = () => {
    const [close, setClose] = useState(true);
    console.log(close);
    const [pages, setPages] = useState([
        {
            name: 'article',
            Icon: NewspaperIcon,
        },
        {
            name: 'category',
            Icon: RectangleGroupIcon,
        },
        {
            name: 'author',
            Icon: UserCircleIcon,
        },
        {
            name: 'tag',
            Icon: TagIcon,
        },
    ]);

    return (
        <>
            {/* {close && ( */}
            <nav className="w-24 md:w-52 ml-3 rounded-tl-3xl col-span-2 flex flex-col md: bg-white">
                <div className="hidden md:block h-12 text-center text-blue-800 font-medium pt-2.5 text-xl">Content</div>
                <ul>
                    <SidebarItems close={() => setClose(false)} items={pages} />
                </ul>
            </nav>
            {/* )} */}
            <Outlet />
        </>
    );
};

export default ContentSidebar;
