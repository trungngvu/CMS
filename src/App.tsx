import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { successToast, errorToast } from "./Toast";

import Sidebar from "./component/Sidebar";
import Dashboard from "./Pages/Dashboard";
import WriteSidebar from "./component/Content/Sidebar";
import EditArticle from "./component/Content/Article";
import EditCategory from "./component/Content/Category";
import EditAuthor from "./component/Content/Author";
import ContentManager from "./component/Content/Manager";

const App = () => {
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
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="write" element={<WriteSidebar />}>
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
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
