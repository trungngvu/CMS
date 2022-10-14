import SidebarItem from './item'

interface props {
    items: string[],
}
const SidebarItems = ({items}: props) => {
    return (
        <>
        {items.map((item,index)=>{
            return (<SidebarItem name={item} key={index}/>)
        })}
        </>
    )
}

export default SidebarItems