import React from "react";

type Props = {};

const KakaoBtn = (props: Props) => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
  const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;

  const loginHandler = () => {
    window.location.href = authUrl;
  };

  return (
    <div className="social" onClick={loginHandler}>
      <img src="sns_kakao.svg" alt="카카오" />
    </div>
  );
};

export default KakaoBtn;
