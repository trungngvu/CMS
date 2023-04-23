import { useNavigate, useLocation } from 'react-router-dom';

interface props {
    data: {
        id: number;
        createdAt?: string;
        updatedAt?: string;
        content?: string;
    }[];
}

const Table = ({ data }: props) => {
    console.log(data);
    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    const handleClick = (id: number) => {
        navigate(`${pathName}/${id}`);
    };

    return (
        <div className="overflow-auto">
            <table>
                <thead>
                    <tr key={'header'} className="text-blue-800">
                        {Object.keys(data[0]).map((key, index) => (
                            <th key={index} className="uppercase">
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className="cursor-pointer hover:bg-blue-100"
                        >
                            {Object.values(item).map((val, index) => (
                                <td key={index}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
