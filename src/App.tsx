import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState, useEffect } from 'react';

import Sidebar from './component/Sidebar';
import Dashboard from './Pages/Dashboard';
import ContentSidebar from './component/Content/Sidebar';
import EditArticle from './component/Content/Article';
import EditCategory from './component/Content/Category';
import EditAuthor from './component/Content/Author';
import EditTag from './component/Content/Tag';
import ContentManager from './component/Content/Manager';
import Login from './component/Login';

const App = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const checkAuth = () => {
        setAuth(true);
        navigate('/');
    };
    useEffect(() => {
        if (auth === false) navigate('/login');
    }, [auth]);
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
                            <Route path="article">
                                <Route index element={<ContentManager />} />
                                <Route path="create" element={<EditArticle />} />
                                <Route path=":id" element={<EditArticle />} />
                            </Route>
                            <Route path="category">
                                <Route index element={<ContentManager />} />
                                <Route path="create" element={<EditCategory />} />
                                <Route path=":id" element={<EditCategory />} />
                            </Route>
                            <Route path="author">
                                <Route index element={<ContentManager />} />
                                <Route path="create" element={<EditAuthor />} />
                                <Route path=":id" element={<EditAuthor />} />
                            </Route>
                            <Route path="tag">
                                <Route index element={<ContentManager />} />
                                <Route path="create" element={<EditTag />} />
                                <Route path=":id" element={<EditTag />} />
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
