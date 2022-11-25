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
                .get(`/author/${id}`)
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
                    .put(`/author/${id}`, {
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
                    .post(`/author`, {
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
            var deletePromise = instance.delete(`/author/${id}`).then(() => {
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
                    className="mb-6 cursor-pointer text-blue-800 font-medium hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Back
                </div>
                <div className="pt-4 pb-8">
                    <div className="flex justify-evenly">
                        <h1 className="text-3xl text-blue-800 font-medium">{title || 'Create an entry'}</h1>
                    </div>
                    <div className="text-blue-600 font-medium">Author</div>
                </div>
                <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                    Name<span className="text-red-600"> *</span>
                </div>
                <input
                    {...register('name', { required: true })}
                    className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-4/5 md:w-2/5 h-7"
                    type={'text'}
                ></input>
                {errors.name?.type === 'required' && (
                    <p role="alert" className="text-red-600 italic text-sm mt-1">
                        <ExclamationTriangleIcon className="w-4 inline" /> Name is required
                    </p>
                )}

                <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
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
                    className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-4/5 md:w-2/5 h-7"
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
                {formState.errors.email?.message && (
                    <p role="alert" className="text-red-600 italic text-sm mt-1">
                        <>
                            <ExclamationTriangleIcon className="w-4 inline" /> {formState.errors.email?.message}
                        </>
                    </p>
                )}
            </div>
        </form>
    );
};

export default EditAuthor;
