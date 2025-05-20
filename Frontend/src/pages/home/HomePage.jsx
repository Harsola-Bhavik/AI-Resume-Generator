import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    window.open("https://github.com/Harsola-Bhavik", "_blank");
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Error in Home Page:", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <>
      <Header user={user} />
      <section className="pt-24 pb-20 bg-[#0f1117]">
        <div className="px-8 mx-auto max-w-7xl text-white">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
              <span>Start </span>
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-[#00F6A7] to-[#3ACCE1] lg:inline">
                building a Resume
              </span>
              <span> for your next Job</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
              Build. Refine. Shine. With AI-Driven Resumes
            </p>
            <div className="mb-4 space-x-0 md:space-x-4 md:mb-8 flex flex-col md:flex-row justify-center">
              <a
                className="inline-flex items-center justify-center px-6 py-3 text-lg text-black font-medium bg-gradient-to-r from-[#00F6A7] to-[#3ACCE1] rounded-2xl hover:scale-105 transition sm:w-auto"
                onClick={handleGetStartedClick}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                onClick={handleClick}
                className="inline-flex items-center justify-center px-6 py-3 mt-3 md:mt-0 text-lg text-white bg-[#1f212a] border border-gray-600 rounded-2xl hover:bg-[#2a2d39] transition cursor-pointer"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl border border-[#3acce1]/30 rounded-xl">
                <div className="flex items-center justify-between px-4 bg-gradient-to-r from-[#00F6A7] to-[#3ACCE1] h-11 rounded-t-xl">
                  <div className="flex space-x-1.5">
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                  </div>
                  <FaInfoCircle className="text-white hover:text-gray-300 transition duration-300 transform hover:rotate-45" />
                </div>
                <img
                  className="object-cover py-2 px-4 bg-[#1a1c23] rounded-b-xl transition duration-300 transform hover:scale-105"
                  src={heroSnapshot}
                  alt="Dashboard"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <footer className="bg-[#0f1117] text-gray-400 border-t border-[#3acce1]/30 mt-20">
        <div className="pt-8 pb-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
          <p className="text-sm">&copy; 2024 Ai-Resume-Builder. All rights reserved.</p>
          <Button variant="secondary" onClick={handleClick} className="bg-[#1f212a] border border-gray-600 hover:bg-[#2a2d39] text-white">
            <FaGithub className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
