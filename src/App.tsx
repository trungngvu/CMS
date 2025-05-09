import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState, useEffect } from 'react';

import Sidebar from './component/Sidebar';
import Dashboard from './Pages/Dashboard';
import ContentSidebar from './component/Content/Sidebar';
import EditArticle from './component/Content/Post';
import EditCategory from './component/Content/Subject';
import EditAuthor from './component/Content/Teacher';
import EditTag from './component/Content/Class';
import ContentManager from './component/Content/Manager';
import Login from './component/Login';

const App = () => {
    const [auth, setAuth] = useState(true);
    const navigate = useNavigate();
    const checkAuth = () => {
        setAuth(true);
        navigate('/');
    };
    // useEffect(() => {
    //     if (auth === false) navigate('/login');
    // }, [auth]);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="colored"
            />

            <Routes>
                {auth ? (
                    <Route path="/" element={<Sidebar checkOut={() => setAuth(false)} />}>
                        <Route index element={<Dashboard />} />
                        <Route path="content" element={<ContentSidebar />}>
                            <Route path="post">
                                <Route index element={<ContentManager viewOnly={false} />} />
                                <Route path="create" element={<EditArticle />} />
                                <Route path=":id" element={<EditArticle />} />
                            </Route>
                            <Route path="subject">
                                <Route index element={<ContentManager viewOnly={false} />} />
                                <Route path="create" element={<EditCategory />} />
                                <Route path=":id" element={<EditCategory />} />
                            </Route>
                            <Route path="teacher">
                                <Route index element={<ContentManager viewOnly={false} />} />
                                <Route path="create" element={<EditAuthor />} />
                                <Route path=":id" element={<EditAuthor />} />
                            </Route>
                            <Route path="class">
                                <Route index element={<ContentManager viewOnly={false} />} />
                                <Route path="create" element={<EditTag />} />
                                <Route path=":id" element={<EditTag />} />
                            </Route>
                            <Route path="contact">
                                <Route index element={<ContentManager viewOnly={true} />} />
                            </Route>
                            <Route path="registration">
                                <Route index element={<ContentManager viewOnly={true} />} />
                            </Route>
                        </Route>
                    </Route>
                ) : (
                    <Route path="login" element={<Login checkAuth={checkAuth} />} />
                )}
            </Routes>
        </>
    );
};

export default App;
