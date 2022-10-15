import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./component/Sidebar";
import Dashboard from "./Pages/Dashboard";
import WriteSidebar from "./component/Write/Sidebar";
import Create from "./component/Write/ContentManager/create";
import Edit from "./component/Write/ContentManager/edit";
import ContentManager from "./component/Write/ContentManager";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="write" element={<WriteSidebar />}>
          <Route path=":category">
            <Route index element={<ContentManager />} />
            <Route path="create" element={<Create />} />
            <Route path=":id" element={<Edit/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
