interface props {
  data: {
    id: number;
    title: string;
    createAt: string;
    updateAt: string;
    state: string;
  }[];
}

const Table = ({ data }: props) => {
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
          <tr key={row.id} className="cursor-pointer hover:bg-slate-100">
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
