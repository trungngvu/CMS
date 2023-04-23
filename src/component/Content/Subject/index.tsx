import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import instance from '../../../Common/axios';
import { Autocomplete, TextField } from '@mui/material';

const EditCategory = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        formState,
    } = useForm();
    const [title, setTitle] = useState('');
    const [classOptions, setClassOptions] = useState<{ title: string; id: number }[]>([]);
    const [classValue, setClassValue] = useState<{ title: string; id: number }[]>([]);
    const [teacherOptions, setTeacherOptions] = useState<{ name: string; id: number }[]>([]);
    const [teacherValue, setTeacherValue] = useState<{ name: string; id: number }[]>([]);
    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        if (id !== '') {
            instance
                .get(`/subject/${id}`)
                .then((res) => {
                    setClassValue(res.data.classes);
                    setTeacherValue(res.data.teachers);
                    setTitle(res.data.title);
                    setValue('title', res.data.title);
                    setValue('description', res.data.description);
                })
                .catch((err) => toast.error(err.code));
        }
        instance.get('/class').then(({ data }) => {
            setClassOptions(data);
        });
        instance.get('/teacher').then(({ data }) => {
            setTeacherOptions(data);
        });
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/subject/${id}`, {
                        ...data,
                        classes: classValue.map(({ id }) => ({
                            id,
                        })),
                        teachers: teacherValue.map(({ id }) => ({
                            id,
                        })),
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
                    .post(`/subject`, {
                        classes: classValue.map(({ id }) => ({
                            id,
                        })),
                        teachers: teacherValue.map(({ id }) => ({
                            id,
                        })),
                        ...data,
                    })
                    .then((res) => {
                        navigate(-1);
                    });
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
            var deletePromise = instance
                .delete(`/subject/${id}`)
                .then(() => {
                    navigate(-1);
                })
                .catch((err) => toast.error(err.code));
            toast.promise(deletePromise, {
                pending: 'Deleting...',
                success: 'Deleted successfully!',
                error: 'Fail!! Check the console for detail',
            });
        } else {
            toast.success('Deleted successfully!');
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
                    <div className="font-medium text-blue-600">Category</div>
                </div>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Tên môn học<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('title', { required: true })}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                {errors.title?.type === 'required' && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <ExclamationTriangleIcon className="inline w-4" /> Vui lòng điền tên môn học
                    </p>
                )}
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Mô tả<span className="text-red-600"></span>
                </div>
                <input
                    {...register('description')}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                <div className="grid grid-rows-2 mt-10">
                    <Autocomplete
                        onChange={(event: any, newValue: any) => {
                            setClassValue(newValue);
                        }}
                        options={classOptions}
                        value={classValue}
                        sx={{ width: '50%' }}
                        multiple
                        renderInput={(params) => <TextField {...params} label="Lớp (có thể chọn nhiều lớp)" />}
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                    />
                </div>
                <div className="grid grid-rows-2">
                    <Autocomplete
                        onChange={(event: any, newValue: any) => {
                            setTeacherValue(newValue);
                        }}
                        options={teacherOptions}
                        value={teacherValue}
                        sx={{ width: '50%' }}
                        multiple
                        renderInput={(params) => (
                            <TextField {...params} label="Giáo viên (có thể chọn nhiều giáo viên)" />
                        )}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                    />
                </div>
            </div>
        </form>
    );
};

export default EditCategory;
