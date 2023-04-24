import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import instance from '../../../Common/axios';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditTag = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [title, setTitle] = useState('');
    const [subjects, setSubjects] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/class/${id}`)
                .then((res) => {
                    setStartDate(dayjs(res.data.startDate));
                    setEndDate(dayjs(res.data.endDate));
                    setTitle(res.data.title);
                    setValue('description', res.data.description);
                    setValue('title', res.data.title);
                    setValue('subjectId', res.data.subjectId);
                    setValue('students', res.data.students);
                })
                .catch((err) => toast.error(err.code));
        instance.get('/subject').then(({ data }) => setSubjects(data));
    }, []);

    const handleSave = (data: any) => {
        // data.subjectId = data.subjectId.id;
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/class/${id}`, {
                        ...data,
                        startDate: startDate?.toDate().toISOString(),
                        endDate: endDate?.toDate().toISOString(),
                    })
                    .then(() => {
                        navigate(-1);
                    });
                toast.promise(updatePromise, {
                    pending: 'Đang cập nhật...',
                    success: 'Cập nhật thành công',
                    error: 'Có lỗi xảy ra',
                });
            } else {
                var createPromise = instance
                    .post(`/class`, {
                        ...data,
                        startDate: startDate?.toDate().toISOString(),
                        endDate: endDate?.toDate().toISOString(),
                    })
                    .then((res) => {
                        navigate(-1);
                    })
                    .catch((err) => toast.error(err.code));
                toast.promise(createPromise, {
                    pending: 'Đang tạo...',
                    success: 'Tạo mới thành công!',
                    error: 'Có lỗi xảy ra',
                });
            }
    };

    const handleDelete = () => {
        stopPropagation(true);
        if (id !== '') {
            var deletePromise = instance.delete(`/class/${id}`).then(() => {
                navigate(-1);
            });
            toast.promise(deletePromise, {
                pending: 'Đang xóa',
                success: 'Xóa thành công!',
                error: 'Có lỗi xảy ra',
            });
        } else {
            toast.success('Xóa thành công!');
            navigate(-1);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div className="px-10 py-6 bg-white min-h-screen w-7/8 md:min-w-[950px]  h-full rounded-tr-3xl">
                <div
                    className="mb-6 font-medium text-blue-800 cursor-pointer hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Quay lại
                </div>
                <div className="pt-6 pb-8">
                    <div className="flex flex-col justify-between md:flex-row">
                        <h1 className="text-3xl font-medium text-blue-800">{title || 'Tạo mục mới'}</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                className="relative px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-400"
                                type="button"
                            >
                                Xóa
                            </button>
                            <input
                                type="submit"
                                value="Lưu"
                                className="relative px-6 py-2 text-sm text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-500"
                            />
                        </div>
                    </div>
                    <div className="font-medium text-blue-600">Lớp học</div>
                </div>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Tên lớp học<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('title', { required: true })}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                {errors.name?.type === 'required' && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <ExclamationTriangleIcon className="inline w-4" /> Vui lòng nhập tên
                    </p>
                )}
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">Giới thiệu</div>
                <input
                    {...register('description')}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">Số lượng học sinh</div>
                <input
                    {...register('students')}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'number'}
                ></input>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Ngày bắt đầu<span className="text-red-600"> *</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Ngày kết thúc<span className="text-red-600"> *</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker format="DD/MM/YYYY" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Môn học<span className="text-red-600"> *</span>
                </div>
                <select
                    {...register('subjectId', { required: true })}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5"
                    defaultValue={''}
                >
                    <option key={''} value={''}>
                        Chọn lớp
                    </option>
                    {subjects.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
                {errors.subjectId?.type === 'required' && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <ExclamationTriangleIcon className="inline w-4" />
                        Vui lòng chọn lớp
                    </p>
                )}
            </div>
        </form>
    );
};

export default EditTag;
