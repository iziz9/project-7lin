import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Groups from "../pages/groups/Groups";
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
      {
        path: "/groups",
        element: <Groups />,
      },
    ],
  },
]);

export default router;
