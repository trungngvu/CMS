import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import useWindowDimensions from '../../ScreenWidth';
import SubSidebarContext from '../../../Common/Context';

interface vectorprops {
    className?: string;
}

interface props {
    name: string;
    label: string;
    Icon: React.FC<vectorprops>;
}

const SidebarItem = ({ name, Icon, label }: props) => {
    const { width } = useWindowDimensions();
    const { setOpenSub } = useContext(SubSidebarContext);
    const styleContent =
        'grid grid-cols-3 px-2 py-2 bg-white rounded-xl hover:bg-blue-100 cursor-pointer hover:rounded hover:font-bold m-1 font-medium';
    const activeStyleContent = 'grid grid-cols-3 px-2 py-2 m-1 bg-blue-100 rounded-lg font-bold';
    return (
        <SubSidebarContext.Consumer>
            {({ setOpenSub, openSub }) => (
                <li
                    onClick={() => {
                        if (width <= 768) setOpenSub(!openSub);
                    }}
                >
                    <NavLink
                        to={`/content/${name}`}
                        className={({ isActive }) => (isActive ? activeStyleContent : styleContent)}
                    >
                        <span className="col-span-2 px-4 text-sm text-center text-blue-800 capitalize ">{label}</span>
                        <Icon className="hidden w-6 h-6 col-span-1 text-sm text-blue-800 md:block justify-self-center " />
                    </NavLink>
                </li>
            )}
        </SubSidebarContext.Consumer>
    );
};

export default SidebarItem;
