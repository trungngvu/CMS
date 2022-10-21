interface vectorprops {
  className: string;
}

interface Props {
  name: string;
  Vector: React.FC<vectorprops>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
}

const Item = ({active, name, Vector, setActive }: Props) => {
  let style = "grid grid-cols-3 px-2 py-2 font-medium hover:bg-blue-100 cursor-pointer hover:font-medium m-1 hover:rounded"
  if(active === name){
    style += " bg-blue-100 rounded-lg font-bold"
  }
  return (
    <li onClick={()=>{setActive(name)}} className={style}>
      <span className="px-4 col-span-2 capitalize text-center text-blue-800">{name}</span>
      <Vector className="h-6 w-6 justify-self-center col-span-1 text-blue-800" />
    </li>
  );
};

export default Item;
