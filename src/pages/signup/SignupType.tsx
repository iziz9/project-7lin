import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BasicBtn } from "../../commons/Button";
import { scrollToTop } from "../../utils/scroll";
import KakaoBtn from "../login/components/KakaoBtn";
import NaverBtn from "../login/components/NaverBtn";
import GoogleBtn from "../login/components/GoogleBtn";

const SignupType = () => {
  const navigate = useNavigate();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  // const snsArray = [
  //   { name: "네이버", img: "sns_naver.svg" },
  //   { name: "카카오", img: "sns_kakao.svg" },
  //   { name: "페이스북", img: "sns_facebook.svg" },
  // ];

  // const socialLogin = snsArray.map((sns) => (
  //   <div className="social" key={sns.name}>
  //     <img src={sns.img} alt={sns.name} />
  //     {isMobile ? null : sns.name}
  //   </div>
  // ));

  return (
    <SignupContainer>
      <img src="/senior_1920.png" alt="시니어" className="back-img" />
      <div className="signup-wrapper">
        <div className="title">회원가입</div>
        <div className="description">
          <p className="first">
            고투게더의 회원이 되어 더 많은 혜택을 누려보세요!
          </p>
          <p>로그인시 더 빠르게 예약을 확인할 수 있습니다.</p>
          <p>생년월일, 성별, 취미를 입력하고 여행을 추천 받으세요.</p>
        </div>
        <div
          className="btn-wrapper"
          onClick={() => {
            navigate("/signup_site");
            scrollToTop();
          }}
        >
          <BasicBtn>{isMobile ? "회원가입" : "고투게더 회원가입"}</BasicBtn>
        </div>
        <SocialLogins>
          <KakaoBtn />
          <NaverBtn />
          <GoogleBtn />
        </SocialLogins>
      </div>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
  margin-top: 2rem;
  margin-bottom: "90px";
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-width: 328px;
  font-size: 23px;
  font-style: normal;
  line-height: 100%;
  letter-spacing: -0.02em;
  word-break: keep-all;
  color: #fff;
  text-align: center;
  .back-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
  }
  .signup-wrapper {
    max-width: 700px;
    padding: 155px 0;
    margin: 0 auto;
  }
  .title {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 95px;
  }
  .description {
    font-weight: 500;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 95px;
    gap: 15px;
    .first {
      font-weight: 600;
      font-size: 23px;
      margin-bottom: 30px;
    }
  }
  .btn-wrapper {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  @media (max-width: 850px) {
    width: 80%;
    margin-top: 35px;
    margin-bottom: 0;
    font-size: 16px;
    text-align: left;
    color: #5b5b5b;
    background-color: #fafafa;
    .back-img {
      display: none;
    }
    .signup-wrapper {
      padding: 50px 40px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 37px;
    }
    .btn-wrapper {
      margin-bottom: 20px;
    }
    .description {
      font-size: 14px;
      gap: 15px;
      color: #000;
      .first {
        color: #5b5b5b;
        font-size: 16px;
        margin-bottom: 0;
      }
      margin-bottom: 0;
    }
  }
`;

const SocialLogins = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  color: #fff;
  .social {
    display: flex;
    align-items: center;
    gap: 19px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      @media (max-width: 850px) {
        width: 30px;
        height: 30px;
      }
    }
  }
  @media (max-width: 850px) {
    gap: 16px;
    color: rgba(132, 132, 132, 0.78);
  }
`;

export default SignupType;
