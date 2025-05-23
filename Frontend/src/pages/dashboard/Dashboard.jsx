import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(Array.isArray(resumes.data) ? resumes.data : []);
    } catch (error) {
      console.log("Error from dashboard", error.message);
      setResumeList([]); // Ensure it's always an array
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="bg-[#0f1117] min-h-screen text-white p-10">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="py-3">Start creating your AI resume for the next job role</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-5 gap-4">
        <AddResume />
        {Array.isArray(resumeList) &&
          resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;