import { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { BuildingLibraryIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import SubSidebarContext from '../../../Common/Context';

import SidebarItems from './items';
const ContentSidebar = () => {
    const pages = [
        {
            name: 'post',
            label: 'Đăng bài',
            Icon: NewspaperIcon,
        },
        {
            name: 'subject',
            label: 'Môn học',
            Icon: AcademicCapIcon,
        },
        {
            name: 'teacher',
            label: 'Giáo viên',
            Icon: UserCircleIcon,
        },
        {
            name: 'class',
            label: 'Lớp học',
            Icon: BuildingLibraryIcon,
        },
    ];
    return (
        <>
            <SubSidebarContext.Consumer>
                {({ openSub }) =>
                    openSub && (
                        <nav className="flex flex-col w-24 col-span-2 ml-2 mr-3 md:w-48 bg-none rounded-3xl md:bg-white">
                            <div className="hidden md:block h-12 text-center text-blue-800 font-medium pt-2.5 text-xl">
                                Nội dung
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
