import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Sidebar from "./component/Sidebar";
import Dashboard from "./Pages/Dashboard";
import WriteSidebar from "./component/Content/Sidebar";
import CreateArticle from "./component/Content/Article/create";
import EditArticle from "./component/Content/Article/edit";
import CreateCategory from "./component/Content/Category/create";
import EditCategory from "./component/Content/Category/edit";
import CreateAuthor from "./component/Content/Author/create";
import EditAuthor from "./component/Content/Author/edit";
import ContentManager from "./component/Content/Manager";

const App = () => {
  const successToast = (mes: string) =>
    toast.success(mes, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

  const errorToast = (mes: string) =>
    toast.error(mes, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

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
              <Route index element={<ContentManager errorToast={errorToast} successToast={successToast}/>} />
              <Route path="create" element={<CreateArticle errorToast={errorToast} successToast={successToast}/>} />
              <Route path=":id" element={<EditArticle errorToast={errorToast} successToast={successToast}/>} />
            </Route>
            <Route path="category">
              <Route index element={<ContentManager errorToast={errorToast} successToast={successToast}/>} />
              <Route path="create" element={<CreateCategory errorToast={errorToast} successToast={successToast}/>} />
              <Route path=":id" element={<EditCategory errorToast={errorToast} successToast={successToast}/>} />
            </Route>
            <Route path="author">
              <Route index element={<ContentManager errorToast={errorToast} successToast={successToast}/>} />
              <Route path="create" element={<CreateAuthor errorToast={errorToast} successToast={successToast}/>} />
              <Route path=":id" element={<EditAuthor errorToast={errorToast} successToast={successToast}/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
