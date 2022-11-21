import { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { TagIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import SubSidebarContext from '../../../Common/Context';

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
            <SubSidebarContext.Consumer>
                {({ openSub }) =>
                    openSub && (
                        <nav className="w-24 md:w-52 bg-none ml-3 rounded-tl-3xl col-span-2 flex flex-col md:bg-white">
                            <div className="hidden md:block h-12 text-center text-blue-800 font-medium pt-2.5 text-xl">
                                Content
                            </div>
                            <ul>
                                <SidebarItems items={pages} />
                            </ul>
                        </nav>
                    )
                }
            </SubSidebarContext.Consumer>
            <Outlet />
        </>
    );
};

export default ContentSidebar;
