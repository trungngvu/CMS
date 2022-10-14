import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Dashboard from "./Pages/Dashboard";
import WriteSidebar from "./component/Write/Sidebar";
import Article from "./component/Write/article";
import ContentManager from "./component/ContentManager";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="write" element={<WriteSidebar />}>
          <Route path=":category" element={<ContentManager />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
