import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Groups from "../pages/groups/Groups";
import Login from "../pages/login/Login";
import MainPage from "../pages/main/MainPage";
import Review from "./../pages/review/Review";
import ReviewItem from "../pages/review/ReviewItems";
import ReviewDetail from "./../pages/review-detail/ReviewDetail";
import SignupType from "../pages/signup/SignupType";
import SignupSite from "../pages/signup/SignupSite";
import ReviewWrite from "./../pages/review-write/ReviewWrite";
import ProductDetail from "./../pages/product-detail/ProductDetail";

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
      {
        path: "review/write",
        element: <ReviewWrite />,
      },
      { path: "/groups", element: <Groups /> },
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
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
