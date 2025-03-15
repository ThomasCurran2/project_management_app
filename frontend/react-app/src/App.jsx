//import { useState } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Project_wrapper from "./components/project_wrapper";
import { getProjects } from "./api/ProjectService";
import { Routes, Route, Navigate } from "react-router-dom";

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
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={"/projects"} />} />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
