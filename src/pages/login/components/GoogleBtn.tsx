import React from "react";

type Props = {};

const GoogleBtn = (props: Props) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20profile%20email&redirect_uri=${redirectUrl}`;
  const loginHandler = () => {
    window.location.href = authUrl;
  };

  return (
    <div className="social" onClick={loginHandler}>
      <img src="sns_google.svg" alt="구글" />
    </div>
  );
};

export default GoogleBtn;
