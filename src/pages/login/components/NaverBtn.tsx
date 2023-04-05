import React from "react";

type Props = {};

const NaverBtn = (props: Props) => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const stateString = import.meta.env.VITE_NAVER_STATE_STRING;
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URL;
  const authUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&state=${stateString}`;

  const loginHandler = () => {
    window.location.href = authUrl;
  };

  return (
    <div className="social" onClick={loginHandler}>
      <img src="sns_naver.svg" alt="네이버" />
    </div>
  );
};

export default NaverBtn;
