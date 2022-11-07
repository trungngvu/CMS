import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { TagIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';

import SidebarItems from './items';
const ContentSidebar = () => {
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
            <nav className="col-span-2 flex flex-col min-h-screen h-full border-r bg-blue-50">
                <div className="h-12 text-center text-blue-800 font-medium pt-2.5 text-xl">Content</div>
                <hr className="text-gray-100 w-8 ml-3" />
                <ul>
                    <SidebarItems items={pages} />
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default ContentSidebar;
