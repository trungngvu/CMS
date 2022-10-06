interface Props {
  name: string,
  Vector: React.SVGProps<SVGSVGElement>,
};

const Item = ({name, Vector}: Props) => {
  return (
    <li className="grid grid-cols-3 py-3 hover:bg-gray-300 cursor-pointer">
      <span className="justify-self-center col-span-2">{name}</span>
      <div className="h-6 w-6 justify-self-center col-span-1">
      </div>
      {}
    </li>
  );
};

export default Item;
