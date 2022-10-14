interface vectorprops {
  className: string;
}

interface Props {
  name: string;
  Vector: React.FC<vectorprops>;
}

const Item = ({ name, Vector }: Props) => {
  return (
    <li className="grid grid-cols-3 py-3 hover:bg-gray-300 cursor-pointer hover:scale-110 hover:rounded">
      <span className="justify-self-center col-span-2">{name}</span>
      <Vector className="h-6 w-6 justify-self-center col-span-1" />
    </li>
  );
};

export default Item;
