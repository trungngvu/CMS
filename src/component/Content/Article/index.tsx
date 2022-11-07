import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import Editor from '../../Quill';
import instance from '../../../Common/axios';
import ArticleRelation from './relation';

import { categoryTypes, authorTypes, tagTypes, relationType } from '../../../Common/Types';

const EditArticle = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        formState,
    } = useForm();
    const [editorValue, setEditorValue] = useState('');
    console.log(editorValue);
    const [title, setTitle] = useState('');

    //Relation data
    const [category, setCategory] = useState<categoryTypes[]>([]);
    const [author, setAuthor] = useState<authorTypes[]>([]);
    const [tag, setTag] = useState<tagTypes[]>([]);
    //Relation value
    const [relation, setRelation] = useState<relationType>({
        category: '',
        author: '',
        tag: [],
    });

    const [propagation, stopPropagation] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/article/${id}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setValue('title', res.data.title);
                    setValue('description', res.data.description);
                    setValue('slug', res.data.slug);
                    setEditorValue(res.data.content);
                })
                .catch((err) => toast.error('GET article error: ', err.code));
        instance
            .get('/category')
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => toast.error('GET category error: ', err.code));
        instance
            .get('/author')
            .then((res) => {
                setAuthor(res.data);
            })
            .catch((err) => toast.error('GET author error: ', err.code));
        instance
            .get('/tag')
            .then((res) => {
                setTag(res.data);
            })
            .catch((err) => toast.error('GET tag error: ', err.code));
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/article/${id}`, {
                        ...data,
                        content: editorValue,
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
                    .post(`/article`, {
                        ...data,
                        content: editorValue,
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
            var deletePromise = instance.delete(`/article/${id}`).then(() => {
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
            <div className="px-10 py-6 bg-blue-50 min-h-screen h-full">
                <div
                    className="mb-6 cursor-pointer text-blue-800 font-medium hover:underline w-fix"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Back
                </div>
                <div className="pt-4 pb-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl text-blue-800 font-medium">{title || 'Create an entry'}</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 rounded-md text-sm relative hover:bg-red-400"
                            >
                                Delete
                            </button>
                            <input
                                type="submit"
                                value="Save"
                                className="bg-blue-700 text-white px-4 rounded-md text-sm relative cursor-pointer hover:bg-blue-500"
                            />
                        </div>
                    </div>
                    <div className="text-blue-600 font-medium">Article</div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div>
                            <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                                Title<span className="text-red-600"> *</span>
                            </div>
                            <input
                                {...register('title', { required: true })}
                                className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
                                type={'text'}
                            ></input>
                            {errors.title?.type === 'required' && (
                                <p role="alert" className="text-red-600 italic text-sm mt-1">
                                    <ExclamationTriangleIcon className="w-4 inline" /> Title is required
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                                Description<span className="text-red-600"> *</span>
                            </div>
                            <input
                                {...register('description', { required: true })}
                                className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
                                type={'text'}
                            ></input>
                            {errors.description?.type === 'required' && (
                                <p role="alert" className="text-red-600 italic text-sm mt-1">
                                    <ExclamationTriangleIcon className="w-4 inline" /> Description is required
                                </p>
                            )}
                        </div>

                        <div className="my-2 cursor-pointer text-blue-800 font-medium w-fix">
                            Slug<span className="text-red-600"> *</span>
                        </div>
                        <input
                            {...register('slug', {
                                required: 'Slug is required',
                                pattern: {
                                    value: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
                                    message: 'Invalid Slug',
                                },
                            })}
                            className="border rounded bg-blue-100 border-3 border-blue-800 p-1 w-3/5 h-7"
                            type={'text'}
                        ></input>
                        {formState.errors.slug?.message && (
                            <p className="text-red-600 italic	text-sm mt-1">
                                <>
                                    <ExclamationTriangleIcon className="w-4 inline" />
                                    {formState.errors.slug?.message}
                                </>
                            </p>
                        )}
                    </div>

                    <div>
                        <ArticleRelation
                            category={category}
                            author={author}
                            tag={tag}
                            relation={relation}
                            setRelation={setRelation}
                        ></ArticleRelation>
                    </div>
                </div>

                <div className="py-10">
                    <div className="mb-2 cursor-pointer text-blue-800 font-medium hover:underline w-fix">Content</div>
                    <div className="border border-blue-800 rounded-md">
                        <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditArticle;
