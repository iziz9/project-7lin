import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Groups from "../pages/groups/Groups";
import Login from "../pages/login/Login";
import MainPage from "../pages/main/MainPage";
import Signup from "../pages/signup/Signup";
import Review from "./../pages/review/Review";
import ReviewItem from "../pages/review/ReviewItems";
import ReviewDetail from "./../pages/review-detail/ReviewDetail";
import TripTest from "../pages/trip-test/TripTest";
import TestResult from "../pages/trip-test/TestResult";

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
        path: "/test",
        element: <TripTest />,
      },
      {
        //임시
        path: "/test-result",
        element: <TestResult />,
      },
    ],
  },
]);

export default router;
