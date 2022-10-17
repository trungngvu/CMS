import { useNavigate, useLocation } from "react-router-dom";

interface props {
  data: {
    id: number;
  }[];
}

const Table = ({ data }: props) => {
  const navigate = useNavigate();
  const pathName= useLocation().pathname;

  const handleClick = (id: number) => {
    navigate(`${pathName}/${id}`);
  };

  return (
    <table>
      <thead>
      <tr key={"header"}>
        {Object.keys(data[0]).map((key,index) => (
          <th key={index}>{key}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((item) => (
        <tr
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="cursor-pointer hover:bg-slate-100"
        >
          {Object.values(item).map((val,index) => (
            <td key={index}>{val}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default Table;
