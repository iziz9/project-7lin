import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Groups from "../pages/groups/Groups";
import Login from "../pages/login/Login";
import MainPage from "../pages/main/MainPage";
import Signup from "../pages/signup/Signup";
import Review from "./../pages/review/Review";
import ReviewItem from "../pages/review/ReviewItems";
import ReviewDetail from "./../pages/review-detail/ReviewDetail";
import Notice from "../pages/notice/Notice";

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
        path: "review",
        element: <Review />,
      },
      {
        path: "review/:id",
        element: <ReviewDetail />,
      },
      { path: "/groups", element: <Groups /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/notice",
        element: <Notice />,
      },
    ],
  },
]);

export default router;
