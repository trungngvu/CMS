interface props {
  data: {
    id: number;
    title: string;
    createdAt: string;
    updateAt: string;
    state: string;
  }[];
};

const Table = ({ data }: props) => {
  const listTable =() => {
    
  }
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
      </tbody>
    </table>
  );
};

export default Table;
