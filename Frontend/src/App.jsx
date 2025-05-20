import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUserData } from "./features/user/userFeatures";
import { startUser } from "./Services/login";
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.editUser.userData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setIsLoading(true);
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
          // Only redirect if trying to access protected routes
          if (location.pathname.startsWith('/dashboard')) {
            navigate("/auth/sign-in", { state: { from: location } });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        dispatch(addUserData(""));
        if (location.pathname.startsWith('/dashboard')) {
          navigate("/auth/sign-in", { state: { from: location } });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  }, [dispatch, navigate, location]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header user={user} />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
