import { useNavigate, useParams } from "react-router-dom";

interface props {
  data: {
    id: number;
    title: string;
    createAt?: string;
    updateAt?: string;
    state?: string;
  }[];
}

const Table = ({ data }: props) => {
  const navigate=useNavigate();
  const category = useParams().category;
  const handleClick = (id: number) => {
    navigate(`/write/${category}/${id}`);
  };
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>TITLE</td>
          <td>CREATE DATE</td>
          <td>UPDATE DATE</td>
          <td>STATE</td>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            onClick={() => handleClick(row.id)}
            className="cursor-pointer hover:bg-slate-100"
            key={row.id}
          >
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.createAt}</td>
            <td>{row.updateAt}</td>
            <td>{row.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
