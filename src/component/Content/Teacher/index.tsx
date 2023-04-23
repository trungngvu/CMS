import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import { toast } from 'react-toastify';
import instance from '../../../Common/axios';

const EditAuthor = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        formState,
    } = useForm();
    const [title, setTitle] = useState('');
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
                    setValue('email', res.data.email);
                })
                .catch((err) => toast.error('GET author error: ', err.code));
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/teacher/${id}`, {
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
                    .post(`/teacher`, {
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
            var deletePromise = instance.delete(`/teacher/${id}`).then(() => {
                navigate(-1);
            });
            toast.promise(deletePromise, {
                pending: 'Deleting...',
                success: 'Deleted successfully!',
                error: 'Fail!! Check the console for detail',
            });
        } else {
            toast.success('Delete successfully!');
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
                    <div className="flex justify-evenly">
                        <h1 className="text-3xl font-medium text-blue-800">{title || 'Create an entry'}</h1>
                    </div>
                    <div className="font-medium text-blue-600">Author</div>
                </div>
                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Name<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('name', { required: true })}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                {errors.name?.type === 'required' && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <ExclamationTriangleIcon className="inline w-4" /> Name is required
                    </p>
                )}

                <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                    Email<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: 'Invalid Email',
                        },
                    })}
                    type={'text'}
                    className="w-4/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 md:w-2/5 h-7"
                ></input>
                <div className="flex gap-3 mt-10">
                    <button
                        onClick={handleDelete}
                        className="relative px-6 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-400"
                    >
                        Delete
                    </button>
                    <input
                        type="submit"
                        value="Save"
                        className="relative px-6 py-2 text-sm text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-500"
                    />
                </div>
                {formState.errors.email?.message && (
                    <p role="alert" className="mt-1 text-sm italic text-red-600">
                        <>
                            <ExclamationTriangleIcon className="inline w-4" /> {formState.errors.email?.message}
                        </>
                    </p>
                )}
            </div>
        </form>
    );
};

export default EditAuthor;
