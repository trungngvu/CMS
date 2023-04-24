import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import { toast } from 'react-toastify';
import instance from '../../../Common/axios';
import { Autocomplete, TextField } from '@mui/material';

const EditAuthor = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        formState,
    } = useForm();
    const [title, setTitle] = useState('');
    const [subjectsOptions, setSubjectsOptions] = useState<{ title: string; id: number }[]>([]);
    const [subjectsValue, setSubjectsValue] = useState<{ title: string; id: number }[]>([]);
    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/teacher/${id}`)
                .then((res) => {
                    setTitle(res.data.name);
                    setValue('name', res.data.name);
                    setValue('description', res.data.description);
                    setSubjectsValue(res.data.subjects);
                })
                .catch((err) => toast.error('Lỗi tải giáo viên: ', err.code));
        instance.get('/subject').then(({ data }) => {
            setSubjectsOptions(data);
        });
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/teacher/${id}`, {
                        ...data,
                        subjects: subjectsValue.map(({ id }) => ({
                            id,
                        })),
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
                    .post(`/teacher`, {
                        ...data,
                        subjects: subjectsValue.map(({ id }) => ({
                            id,
                        })),
                    })
                    .then((res) => {
                        navigate(-1);
                    });
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
            var deletePromise = instance.delete(`/teacher/${id}`).then(() => {
                navigate(-1);
            });
            toast.promise(deletePromise, {
                pending: 'Đang xóa...',
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
            <div className="px-10 py-6 bg-white min-h-screen w-7/8 md:min-w-[950px] h-full rounded-3xl">
                <div
                    className="mb-6 font-medium text-blue-800 cursor-pointer hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Quay lại
                </div>
                <div className="pt-4 pb-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-medium text-blue-800">{title || 'Tạo mục mới'}</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="relative px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-400"
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
                    <div className="font-medium text-blue-600">Giáo viên</div>
                </div>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Tên giáo viên<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('name', { required: true })}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                {errors.name?.type === 'required' && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <ExclamationTriangleIcon className="inline w-4" /> Vui lòng nhập tên giáo viên
                    </p>
                )}

                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Giới thiệu<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('description')}
                    type={'text'}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                ></input>
                <div className="grid grid-rows-2 mt-5">
                    <Autocomplete
                        onChange={(event: any, newValue: any) => {
                            setSubjectsValue(newValue);
                        }}
                        options={subjectsOptions}
                        value={subjectsValue}
                        sx={{ width: '50%' }}
                        multiple
                        renderInput={(params) => (
                            <TextField {...params} label="Môn học (giáo viên có thể dạy nhiều môn học)" />
                        )}
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                    />
                </div>
            </div>
        </form>
    );
};

export default EditAuthor;
