import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NaverLogin = (props: Props) => {
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code",
  );
  const state: string | null = new URL(window.location.href).searchParams.get(
    "state",
  );

  useEffect(() => {
    if (code && state) {
      alert("네이버 인증코드 받기 성공 and 로그인 기능 미완");
      navigate("/login", { replace: true });
    } else {
      alert("네이버 인증코드 받기 실패");
      navigate("/login", { replace: true });
    }
  }, [code, navigate]);

  return <div>로딩</div>;
};

export default NaverLogin;
