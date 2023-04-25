import { useNavigate, useLocation } from 'react-router-dom';

interface props {
    viewonly: boolean;
    data: {
        id: number;
        createdAt?: string;
        updatedAt?: string;
        content?: string;
    }[];
}

const Table = ({ data, viewonly }: props) => {
    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    const handleClick = (id: number) => {
        !viewonly && navigate(`${pathName}/${id}`);
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
