import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ProjectWrapper from "./components/ProjectWrapper";
import { getProjects } from "./api/ProjectService";
import { Routes, Route, Navigate } from "react-router-dom";
import EditForm from "./components/EditForm";
import { toastError } from "./api/ToastService";
import { ToastContainer } from "react-toastify";
import CredentialWrapper from "./components/CredentialWrapper";

/**
 * This component renders each endpoint with its elements.
 * @returns {ReactNode} A React element that renders each endpoint.
 */
function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log();
    getAllProjects();
  }, []);

  /**
   * Gets every project on the first page and sets it to the 'data' object.
   * @param {int} page default page retrieved from the database.
   * @param {int} size default amount of elements per page.
   */
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

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={"/credentials"} />} />
          <Route path="/credentials" element={<CredentialWrapper />} />
          <Route
            path="/projects"
            element={
              <ProjectWrapper
                data={data}
                currentPage={currentPage}
                getAllProjects={getAllProjects}
              />
            }
          />
          <Route path="/projects/:id" element={<EditForm />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
