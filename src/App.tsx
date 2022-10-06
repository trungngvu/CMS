import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />}/>
    </Route>
  </Routes>
  );
};

export default App;
