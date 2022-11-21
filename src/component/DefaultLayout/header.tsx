import { Bars3Icon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ReactLogo from '../../images/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../ScreenWidth';

interface props {
    checkOut: () => void;
    checkMini: () => void;
}
const Header = ({ checkOut, checkMini }: props) => {
    const { width } = useWindowDimensions();
    const [close, setClose] = useState(true);
    return (
        <div className="flex h-16 justify-between text-center bg-blue-50">
            <div className="flex ml-6">
                <div onClick={() => checkMini()} className="flex text-center">
                    <Bars3Icon className={`w-8 cursor-pointer text-blue-800`} />
                </div>
                <Link to={'/'} className="hidden md:flex my-auto ml-6">
                    <img className="w-20" src={ReactLogo} alt="React Logo" />
                </Link>
            </div>
            <div className="py-2 h-full w-1/2  flex text-center text-stone-800  ">
                <div className="bg-gray-50 h-full ml-1 text-center text-gray-700 rounded-l-xl">
                    <MagnifyingGlassIcon className="ml-5 mt-3 h-1/2 mr-2" />
                </div>
                <input
                    className="bg-gray-50 rounded-r-xl  pl-2 outline-none w-full h-full"
                    type="text"
                    placeholder="Tìm kiếm"
                />
            </div>
            <div onClick={() => setClose(!close)} className="py-3 mr-6 flex text-center cursor-pointer relative ">
                <div className="bg-slate-600 w-10 rounded-full "></div>
                <div className="hidden md:block m-auto ml-2">
                    <p>Admin</p>
                </div>
                {!close && (
                    <div onClick={checkOut} className="bg-blue-50 absolute top-full h-2/3 shadow w-28 rounded-sm">
                        <p className="rounded-sm mt-2">Log out</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;
