import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import instance from '../../../Common/axios';

const EditTag = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [title, setTitle] = useState('');
    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/tag/${id}`)
                .then((res) => {
                    setTitle(res.data.name);
                    setValue('name', res.data.name);
                    setValue('email', res.data.email);
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
                    .post(`/tag`, {
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
            var deletePromise = instance.delete(`/tag/${id}`).then(() => {
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
                    className="mb-6 cursor-pointer text-blue-800 font-medium hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Quay lại
                </div>
                <div className="pt-6 pb-8">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h1 className="text-3xl text-blue-800 font-medium">{title || 'Create an entry'}</h1>
                    </div>
                    <div className="text-blue-600 font-medium">Tag </div>
                </div>
                <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                    Name<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('name', { required: true })}
                    className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-4/5 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                <div className="flex mt-10 gap-3">
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white py-2 px-6 rounded-md text-sm relative hover:bg-red-400"
                    >
                        Delete
                    </button>
                    <input
                        type="submit"
                        value="Save"
                        className="bg-blue-700 text-white py-2 px-6 rounded-md text-sm relative cursor-pointer hover:bg-blue-500"
                    />
                </div>
                {errors.name?.type === 'required' && (
                    <p role="alert" className="text-red-600 italic text-sm mt-1">
                        <ExclamationTriangleIcon className="w-4 inline" /> Name is required
                    </p>
                )}
            </div>
        </form>
    );
};

export default EditTag;
