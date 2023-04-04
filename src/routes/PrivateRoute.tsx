import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginAtom";

interface Props {
  onlyAuth: boolean;
  children: React.ReactElement;
}

export const PrivateRoute = ({ onlyAuth, children }: Props) => {
  const loginStatus = useRecoilValue(loginState);

  if (onlyAuth && !loginStatus.isLogin) {
    alert("로그인을 해야만 볼 수 있는 페이지입니다");
    return <Navigate to="/login" replace={true} />;
  } else if (!onlyAuth && loginStatus.isLogin) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
