import SidebarItem from './item';

interface vectorprops {
    className?: string;
}

interface props {
    items: {
        name: string;
        label: string;
        Icon: React.FC<vectorprops>;
    }[];
}
const SidebarItems = ({ items }: props) => {
    return (
        <>
            {items.map((item, index) => {
                return <SidebarItem name={item.name} label={item.label} Icon={item.Icon} key={index} />;
            })}
        </>
    );
};

export default SidebarItems;
