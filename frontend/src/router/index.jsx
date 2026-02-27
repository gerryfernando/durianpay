import { createBrowserRouter } from "react-router-dom";
import Cart from "../page/Cart";
import ErrorPage from "../page/ErrorPage";
import Menu from "../page/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
