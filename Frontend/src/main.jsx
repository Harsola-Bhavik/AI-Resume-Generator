import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { EditResume } from "./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx";
import AuthPage from "./pages/auth/customAuth/AuthPage.jsx";
import { resumeStore } from "./store/store";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/edit-resume/:resume_id",
        element: (
          <ProtectedRoute>
            <EditResume />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/view-resume/:resume_id",
        element: (
          <ProtectedRoute>
            <ViewResume />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/sign-in",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={resumeStore}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
