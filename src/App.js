import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* pages */
import NotFound from "./pages/NotFoundPage/NotFound";
import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivilegesPage from "./pages/PrivilegesPage/PrivilegesPage";
import ReportingPage from "./pages/ReportingPage/ReportingPage";
import UnitPage from "./pages/UnitPage/UnitPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import QuestionFormPage from "./pages/QuestionFormPage/QuestionFormPage";
import NewQuestion from "./pages/NewQuestion/NewQuestion";
import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";
import React, { useState, useEffect } from "react";
/* router */

function App() {

  return (
    <div className="App h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/privileges" element={<PrivilegesPage/> } />
          <Route exact path="/Reporting" element={<ReportingPage  /> } />
          <Route exact path="/dashboard/book/:book_number/module/:module_number/unit/:unit_number" element={<UnitPage />} />
          <Route exact path="/dashboard/book/:book_number/module/:module_number/unit/:unit_number/task/:task_number" element={<TaskPage/> } />
          <Route exact path="/dashboard/editQuestion/:_id" element={<QuestionFormPage />} />
          <Route exact path="/dashboard/newQuestion/:task_number/:type" element={<NewQuestion />} />
          <Route exact path="/dashboard/book/:book_number/module/:module_number/unit/:unit_number/newTask/:type" element={<NewTaskPage />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
