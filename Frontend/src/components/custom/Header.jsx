import React, { useEffect } from "react";
import logo from "/logo.jpg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  return (
    <div
      id="printHeader"
      className="flex justify-between px-10 py-5 shadow-md items-center bg-[#0f1117] text-white"
    >
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          width={100}
          height={100}
          style={{ borderRadius: "50px", cursor: "pointer" }}
        />
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-white text-black hover:bg-gray-200"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            variant="outline"
            className="border-white text-black hover:bg-gray-200"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button
            className="bg-white text-black hover:bg-gray-200"
            onClick={async () => {
              try {
                const response = await logoutUser();
                if (response.statusCode === 200) {
                  dispatch(addUserData(""));
                  navigate("/");
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="bg-white text-black hover:bg-gray-200">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;