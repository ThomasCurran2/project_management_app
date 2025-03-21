//import { useState } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Project_wrapper from "./components/project_wrapper";
import { getProjects } from "./api/ProjectService";
import { Routes, Route, Navigate } from "react-router-dom";
import Edit_form from "./components/Edit_form";
import { toastError } from "./api/ToastService";
import { ToastContainer } from "react-toastify";
import Credential_wrapper from "./components/Credential_wrapper";

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllProjects = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getProjects(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  useEffect(() => {
    console.log();
    getAllProjects();
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={"/credentials"} />} />
          <Route path="/credentials" element={<Credential_wrapper />} />
          <Route
            path="/projects"
            element={
              <Project_wrapper
                data={data}
                currentPage={currentPage}
                getAllProjects={getAllProjects}
              />
            }
          />
          <Route path="/projects/:id" element={<Edit_form />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
