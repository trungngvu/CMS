import { Outlet } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import useWindowDimensions from '../ScreenWidth';

import SubSidebarContext from '../../Common/Context';
import Item from './item';
import Header from '../DefaultLayout/header';
interface props {
    checkOut: () => void;
}
export default function Sidebar({ checkOut }: props) {
    const [openMini, setOpenMini] = useState(false);
    const [openSub, setOpenSub] = useState(true);
    const { width } = useWindowDimensions();
    return (
        <div>
            <SubSidebarContext.Provider value={{ openSub, setOpenSub }}>
                <Header
                    checkMini={() => {
                        if (width > 768) setOpenMini(!openMini);
                        else setOpenMini(false);
                    }}
                    checkOut={checkOut}
                />
                <div className="flex bg-blue-50">
                    <nav
                        className={`inline-flex flex-col min-h-screen bg-blue-50 relative h-full ${
                            !openMini ? 'w-20' : 'w-44'
                        }`}
                    >
                        <ul>
                            <Item hidden={!openMini} name="content" label='Nội dung' Vector={PencilSquareIcon} />
                        </ul>
                    </nav>

                    <Outlet />
                </div>
            </SubSidebarContext.Provider>
        </div>
    );
}
