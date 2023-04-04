import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Groups from "../pages/groups/Groups";
import Login from "../pages/login/Login";
import MainPage from "../pages/main/MainPage";
import Review from "./../pages/review/Review";
import ReviewItem from "../pages/review/ReviewItems";
import ReviewDetail from "./../pages/review-detail/ReviewDetail";
import Notice from "../pages/notice/Notice";
import TripTest from "../pages/recommend/TripTestPage";
import TestResult from "../pages/recommend/TestResult";
import SignupType from "../pages/signup/SignupType";
import SignupSite from "../pages/signup/SignupSite";
import Reservation from "../pages/reservation/Reservation";
import MyPage from "../pages/mypage/MyPage";
import MyReservation from "../pages/mypage/MyReservation";
import Favor from "../pages/mypage/Favor";
import Point from "../pages/mypage/Point";
import RecommendPage from "../pages/recommend/RecommendPage";

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
      { path: "groups", element: <Groups /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup_type",
        element: <SignupType />,
      },
      {
        path: "/signup_site",
        element: <SignupSite />,
      },
      {
        path: "/test",
        element: <TripTest />,
      },
      {
        path: "/recommend",
        element: <RecommendPage />,
      },
      {
        path: "notice",
        element: <Notice />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
        children: [
          {
            path: "",
            element: <MyReservation />,
          },
          {
            path: "myreservation",
            element: <MyReservation />,
          },
          {
            path: "favor",
            element: <Favor />,
          },
          {
            path: "point",
            element: <Point />,
          },
        ],
      },
    ],
  },
]);

export default router;
