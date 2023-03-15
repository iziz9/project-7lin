import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainPage from "../pages/main/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
