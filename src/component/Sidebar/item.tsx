import { NavLink } from 'react-router-dom';

interface vectorprops {
    className: string;
}

interface Props {
    name: string;
    Vector: React.FC<vectorprops>;
}

const Item = ({ name, Vector }: Props) => {
    const style =
        'grid grid-cols-3 px-2 py-2 font-medium hover:bg-blue-100 cursor-pointer hover:font-medium m-1 hover:rounded-lg';
    const activeStyle = style + ' bg-blue-100 rounded-lg font-bold';

    return (
        <li>
            <NavLink to={name} className={({ isActive }) => (isActive ? activeStyle : style)}>
                <span className="px-4 col-span-2 capitalize text-blue-800">{name}</span>
                <Vector className="h-6 w-6 col-span-1 text-blue-800" />
            </NavLink>
        </li>
    );
};

export default Item;
