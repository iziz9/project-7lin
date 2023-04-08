import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

interface Props {
  onlyAuth: boolean;
  children: React.ReactElement;
}

export const PrivateRoute = ({ onlyAuth, children }: Props) => {
  // const accessToken = getCookie("accessToken");

  // if (onlyAuth && !accessToken) {
  //   alert("로그인을 해야만 볼 수 있는 페이지입니다");
  //   return <Navigate to="/login" replace={true} />;
  // } else if (!onlyAuth && accessToken) {
  //   return <Navigate to="/" replace={true} />;
  // }

  return children;
};

export default PrivateRoute;
