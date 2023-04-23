import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import instance from '../../../Common/axios';
import { Dayjs } from 'dayjs';
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
    const [startDate, setStartDate] = useState<string | null>('');
    console.log(startDate)
    const [endDate, setEndDate] = useState<string | null>('');
    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/class/${id}`)
                .then((res) => {
                    console.log(res.data);
                    setTitle(res.data.title);
                    setValue('title', res.data.title);
                })
                .catch((err) => toast.error(err.code));
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/tag/${id}`, {
                        ...data,
                    })
                    .then(() => {
                        navigate(-1);
                    });
                toast.promise(updatePromise, {
                    pending: 'Updating...',
                    success: 'Updated successfully!',
                    error: 'Fail!! Check the console for detail',
                });
            } else {
                var createPromise = instance
                    .post(`/class`, {
                        ...data,
                    })
                    .then((res) => {
                        navigate(-1);
                    })
                    .catch((err) => toast.error(err.code));
                toast.promise(createPromise, {
                    pending: 'Creating...',
                    success: 'Created successfully!',
                    error: 'Fail!! Check the console for detail',
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
                pending: 'Deleting',
                success: 'Delete successfully!',
                error: 'Fail!! Check the console for detail',
            });
        } else {
            toast.success('Deleted successfully!');
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
                        <h1 className="text-3xl font-medium text-blue-800">{title || 'Create an entry'}</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                className="relative px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-400"
                                type="button"
                            >
                                Delete
                            </button>
                            <input
                                type="submit"
                                value="Save"
                                className="relative px-6 py-2 text-sm text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-500"
                            />
                        </div>
                    </div>
                    <div className="font-medium text-blue-600">Tag </div>
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
                        <ExclamationTriangleIcon className="inline w-4" /> Name is required
                    </p>
                )}
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">Giới thiệu</div>
                <input
                    {...register('description')}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Ngày bắt đầu<span className="text-red-600"> *</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Ngày kết thúc<span className="text-red-600"> *</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </form>
    );
};

export default EditTag;
