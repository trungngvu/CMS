import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import Editor from '../../Quill';
import instance from '../../../Common/axios';

import { Switch, TextField } from '@mui/material';

const EditArticle = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        formState,
    } = useForm();
    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    const [switchValue, setSwitchValue] = useState(false);

    const [propagation, stopPropagation] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const navigate = useNavigate();
    const id = useParams().id || '';

    useEffect(() => {
        id !== '' &&
            instance
                .get(`/post/${id}`)
                .then(({ data }) => {
                    setTitle(data.title);
                    setValue('title', data.title);
                    setSwitchValue(data.published);
                    setTags(data.tags);
                    setEditorValue(data.content);
                })
                .catch((err) => toast.error('Lỗi tải bài đăng: ', err.code));
    }, []);

    const handleSave = (data: any) => {
        if (propagation === false)
            if (id !== '') {
                var updatePromise = instance
                    .put(`/post/${id}`, {
                        ...data,
                        published: switchValue,
                        tags,
                        content: editorValue,
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
                    .post(`/post`, {
                        ...data,
                        published: switchValue,
                        tags,
                        content: editorValue,
                        authorId: 'clgm6w2f40000kfqk5u4ufdzb',
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
            var deletePromise = instance.delete(`/post/${id}`).then(() => {
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
            {/* <div className="px-10 py-6 bg-white min-h-screen max-w-screen-lg md:max-w-[calc[100%-20rem]] h-full rounded-tr-3xl"> */}
            <div className="px-10 py-6 bg-white max-w-3xl min-h-screen w-7/8 md:min-w-[950px] h-full rounded-3xl">
                <div
                    className="mb-6 font-medium text-blue-800 cursor-pointer hover:underline"
                    onClick={() => navigate(-1)}
                >
                    &crarr; Quay lại
                </div>
                <div className="pt-4 pb-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-medium text-blue-800">{title || 'Tạo mục mới'}</h1>
                        <div className="flex gap-3">
                            <div className="flex items-center font-medium text-blue-800">Đăng tải</div>
                            <Switch
                                checked={switchValue}
                                onChange={(event: any, newValue: boolean) => {
                                    setSwitchValue(newValue);
                                }}
                            />
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
                    <div className="font-medium text-blue-600">Đăng bài</div>
                </div>

                <div className="grid grid-cols-1">
                    <div className="grid grid-rows-2">
                        <div>
                            <div className="my-2 font-medium text-blue-800 cursor-pointer w-fix">
                                Bài viết<span className="text-red-600"> *</span>
                            </div>
                            <input
                                {...register('title', { required: true })}
                                className="w-3/5 p-1 bg-blue-100 border border-blue-800 rounded border-3 h-7"
                                type={'text'}
                            ></input>
                            {errors.title?.type === 'required' && (
                                <p role="alert" className="mt-1 text-sm italic text-red-600">
                                    <ExclamationTriangleIcon className="inline w-4" /> Vui lòng nhập tiêu đề
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <div className="grid grid-rows-2">
                        <Autocomplete
                            onChange={(event: any, newValue: any) => {
                                setTags(newValue);
                            }}
                            options={tags}
                            value={tags}
                            sx={{ width: '50%' }}
                            freeSolo
                            multiple
                            renderInput={(params) => (
                                <TextField {...params} label="Tag (bấm enter để thêm nhiều tag)" />
                            )}
                        />
                    </div> */}
                </div>

                <div className="py-7">
                    <div className="mb-2 font-medium text-blue-800 cursor-pointer w-fix">Nội dung</div>
                    <div className="border border-blue-800 rounded-md">
                        <Editor setEditorValue={setEditorValue} editorValue={editorValue} />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditArticle;
