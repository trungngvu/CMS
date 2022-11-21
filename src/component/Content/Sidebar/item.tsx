import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import useWindowDimensions from '../../ScreenWidth';
import SubSidebarContext from '../../../Common/Context';

interface vectorprops {
    className?: string;
}

interface props {
    name: string;
    Icon: React.FC<vectorprops>;
}

const SidebarItem = ({ name, Icon }: props) => {
    const { width } = useWindowDimensions();
    const { setOpenSub } = useContext(SubSidebarContext);
    const styleContent =
        'grid grid-cols-3 px-2 py-2 bg-white rounded-xl hover:bg-blue-100 cursor-pointer hover:rounded hover:font-bold m-1 font-medium';
    const activeStyleContent = 'grid grid-cols-3 px-2 py-2 m-1 bg-blue-100 rounded-lg font-bold';
    return (
        <SubSidebarContext.Consumer>
            {({ setOpenSub }) => (
                <li
                    onClick={() => {
                        if (width <= 768) setOpenSub(false);
                    }}
                >
                    <NavLink
                        to={`/content/${name}`}
                        className={({ isActive }) => (isActive ? activeStyleContent : styleContent)}
                    >
                        <span className="px-4 col-span-2 capitalize text-center text-blue-800 text-sm ">{name}</span>
                        <Icon className="hidden md:block h-6 w-6 justify-self-center col-span-1 text-blue-800 text-sm	" />
                    </NavLink>
                </li>
            )}
        </SubSidebarContext.Consumer>
    );
};

export default SidebarItem;
