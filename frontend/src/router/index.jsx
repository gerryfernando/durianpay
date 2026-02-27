import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../page/ErrorPage";
import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import { AuthProvider } from "../page/Dashboard/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
