import { Outlet, Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Item from './item';
import Header from '../DefaultLayout/header';
interface props {
    checkOut: () => void;
}
export default function Sidebar({ checkOut }: props) {
    const [open, setOpen] = useState(true);
    // console.log(open);
    return (
        <div>
            <Header checkMini={() => setOpen(!open)} checkOut={checkOut} />
            <div className="flex bg-blue-50">
                <nav
                    className={`inline-flex flex-col min-h-screen bg-blue-50 relative h-full ${
                        !open ? 'w-20' : 'w-52'
                    }`}
                >
                    <ul>
                        <Item hidden={!open} name="content" Vector={PencilSquareIcon} />
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}
