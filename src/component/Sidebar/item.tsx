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
  let style = "grid grid-cols-3 px-2 pt-2 hover:bg-gray-300 cursor-pointer hover:scale-110 hover:rounded"
  if(active === name){
    style += " m-1 bg-blue-100 rounded-lg font-medium"
  }
  return (
    <li onClick={()=>{setActive(name)}} className={style}>
      <span className="px-4 col-span-2 capitalize h-12 text-center text-blue-800">{name}</span>
      <Vector className="h-6 w-6 justify-self-center col-span-1 text-blue-800" />
    </li>
  );
};

export default Item;
