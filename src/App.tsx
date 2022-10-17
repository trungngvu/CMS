import { Routes, Route } from "react-router-dom";

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
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="write" element={<WriteSidebar />}>
          <Route path="article">
            <Route index element={<ContentManager />} />
            <Route path="create" element={<CreateArticle />} />
            <Route path=":id" element={<EditArticle />} />
          </Route>
          <Route path="category">
            <Route index element={<ContentManager />} />
            <Route path="create" element={<CreateCategory />} />
            <Route path=":id" element={<EditCategory />} />
          </Route>
          <Route path="author">
            <Route index element={<ContentManager />} />
            <Route path="create" element={<CreateAuthor />} />
            <Route path=":id" element={<EditAuthor />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
