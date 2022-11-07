import { Outlet, Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Item from './item';
import ReactLogo from '../../images/logo.svg';

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    // console.log(open);
    return (
        <>
            <nav className={`col-span-2 ${!open && 'col-span-1'} flex flex-col min-h-screen relative h-full border-r`}>
                <Bars3Icon
                    className={`w-8 cursor-pointer absolute top-2 left-2 text-blue-800 ${
                        open && 'rotate-180 duration-1000'
                    }`}
                    onClick={() => setOpen(!open)}
                />
                <Link to={'/'} className="h-12 mx-auto px-4">
                    <div className="px-4 py-4 col-span-2 capitalize h-12 text-center text-blue-800 font-bold pt-2.5">
                        <img className="absolute top-0" src={ReactLogo} alt="React Logo" />
                    </div>
                </Link>
                <hr className="text-gray-100" />
                <ul>
                    <Item hidden={!open} name="content" Vector={PencilSquareIcon} />
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
