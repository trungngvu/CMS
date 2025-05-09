import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Table from './table';
import instance from '../../../Common/axios';

const ContentManager = ({ viewOnly }: { viewOnly: boolean }) => {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    //get last path of the URL
    const location = useLocation();
    const api = location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
    let label = '';
    if (api === 'post') label = 'Đăng bài';
    if (api === 'class') label = 'Lớp học';
    if (api === 'teacher') label = 'Giáo viên';
    if (api === 'subject') label = 'Môn học';
    if (api === 'contact') label = 'Form liên lạc';
    if (api === 'registration') label = 'Form đăng ký học';

    useEffect(() => {
        instance
            .get(`/${api}`)
            .then(({ data }) => {
                let displayData = [];
                if (api === 'subject')
                    displayData = data.map((item: any) => {
                        delete item.classes;
                        return {
                            ...item,
                        };
                    });
                if (api === 'teacher')
                    displayData = data.map((item: any) => {
                        delete item.subjects;
                        delete item.image;
                        return {
                            ...item,
                        };
                    });
                if (api === 'class')
                    displayData = data.map((item: any) => {
                        delete item.subjectId;
                        delete item.registrationFormId;
                        return {
                            ...item,
                            startDate: new Date(item.startDate).toLocaleDateString(),
                            endDate: new Date(item.endDate).toLocaleDateString(),
                        };
                    });
                if (api === 'post')
                    displayData = data.map((item: any) => {
                        delete item.authorId;
                        delete item.tags;
                        delete item.author;
                        delete item.content;
                        return {
                            id: item.id,
                            'tiêu đề': item.title,
                            'đăng tải': item.published ? 'Đã đăng' : 'Chưa đăng',
                            'ngày viết': new Date(item.createdAt).toLocaleDateString(),
                            'ngày cập nhật': new Date(item.updatedAt).toLocaleDateString(),
                        };
                    });
                if (api === 'contact') displayData = data;
                if (api === 'registration')
                    displayData = data.map((item: any) => {
                        console.log(item);
                        return {
                            id: item.id,
                            Tên: item.name,
                            'Email/SĐT': item.contact,
                            'Lớp học muốn đăng ký': item.classes
                                ?.map((i: any) => i.title)
                                .join(', ')
                                .split(),
                        };
                    });
                setTableData(displayData);
            })
            .catch((err) => toast.error(err.code));
    }, [api]);

    return (
        // <div className="w-4/5 h-screen col-span-2 px-10 py-6 ml-0 mr-3 bg-white md:w-screen rounded-tr-3xl">
        <div className="px-10 py-6 bg-white min-h-screen md:min-w-[950px] h-full rounded-3xl">
            <div className="container">
                <div
                    className="mb-6 font-medium text-blue-800 cursor-pointer hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Quay lại
                </div>
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="flex items-center text-lg font-bold text-blue-800 capitalize">{label}</div>
                    {!viewOnly && (
                        <Link
                            to={`create`}
                            className="bg-blue-800 flex my-2 md:my-none justify-center items-center text-white max-w-[170px] md:max-w-none pl-4 pr-4 py-1 md:py-2  rounded-md text-sm relative hover:scale-110"
                        >
                            <span className="flex items-center justify-center pr-4 text-xl font-bold ">+</span>
                            <p>Tạo mục mới</p>
                        </Link>
                    )}
                </div>

                <div className="">{tableData.length || 0} mục được tìm thấy</div>
            </div>
            {tableData.length !== 0 && <Table viewonly={viewOnly} data={tableData} />}
        </div>
    );
};

export default ContentManager;
