import SubSidebarContext from '../../Common/Context';
import { NavLink } from 'react-router-dom';

interface vectorprops {
    className: string;
}

interface Props {
    label: string;
    name: string;
    Vector: React.FC<vectorprops>;
    hidden: boolean;
}

const Item = ({ name, Vector, hidden, label }: Props) => {
    const style =
        'grid grid-cols-3 pr-2 pl-3 py-1 font-medium hover:bg-blue-100 cursor-pointer hover:font-medium m-1 hover:rounded-lg';
    const activeStyle = style + ' bg-blue-100 rounded-lg font-bold';
    return (
        <SubSidebarContext.Consumer>
            {({ setOpenSub, openSub }) => (
                <li onClick={() => setOpenSub(!openSub)}>
                    <NavLink to={name} className={({ isActive }) => (isActive ? activeStyle : style)}>
                        {!hidden && <span className={`px-2 col-span-2 capitalize text-blue-800 `}>{label}</span>}
                        <Vector className="w-8 h-8 col-span-1 ml-1 text-center text-blue-800" />
                    </NavLink>
                </li>
            )}
        </SubSidebarContext.Consumer>
    );
};

export default Item;
