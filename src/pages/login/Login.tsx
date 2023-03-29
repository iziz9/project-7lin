import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BasicBtn } from "../../commons/Button";
import { BasicInput } from "../../commons/Input";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";
import { scrollToTop } from "../../utils/scroll";
import FindIdPasswordModal from "./modal_content/FindIdPasswordModal";
import NonMemberResvationModal from "./modal_content/NonMemberResvationModal";

const Login = () => {
  const navigate = useNavigate();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const { openModal } = useModal();

  const nonMemberResvationModalData = {
    title: "비회원 예약 조회",
    content: <NonMemberResvationModal />,
  };

  const findIdPasswordModalData = {
    title: "아이디 찾기",
    content: <FindIdPasswordModal />,
  };

  const snsArray = [
    { name: "네이버", img: "sns_naver.svg" },
    { name: "카카오", img: "sns_kakao.svg" },
    { name: "페이스북", img: "sns_facebook.svg" },
  ];

  const socialLogin = snsArray.map((sns) => (
    <div className="social" key={sns.name}>
      <img src={sns.img} alt={sns.name} />
      {isMobile ? null : sns.name}
    </div>
  ));

  return (
    <>
      <LoginContainer>
        <div className="login-wrapper">
          <div className="title">로그인</div>
          <LoginForm>
            <div className="input_form id">
              <BasicInput type="text" placeholder="아이디" />
            </div>
            <div className="input_form password">
              <BasicInput type="password" placeholder="비밀번호" />
            </div>
            <div className="label-wrapper">
              <label>
                <input type="checkbox" />
                로그인 상태 저장
              </label>
            </div>
            <div className="btn-wrapper">
              <BasicBtn type="submit" value="Submit">
                로그인
              </BasicBtn>
            </div>
          </LoginForm>
          <div
            className="btn-wrapper"
            onClick={() => openModal(nonMemberResvationModalData)}
          >
            <BasicBtn backgroundColor="#8692A5" fontColor="#fff">
              비회원 예약 조회
            </BasicBtn>
          </div>
          <Others>
            <div
              className="option sign_up"
              onClick={() => {
                navigate("/signup_type");
                scrollToTop();
              }}
            >
              회원가입
            </div>
            <div
              className="option find"
              onClick={() => openModal(findIdPasswordModalData)}
            >
              아이디 / 비밀번호 찾기
            </div>
          </Others>
          <SocialLogins>{socialLogin}</SocialLogins>
        </div>
      </LoginContainer>
      <Modal />
    </>
  );
};

const LoginContainer = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-top: 2rem;
  margin-bottom: "90px";
  background: #fafafa;
  width: 100%;
  min-width: 328px;
  font-size: 23px;
  line-height: 100%;
  letter-spacing: -0.02em;
  .login-wrapper {
    max-width: 700px;
    padding: 155px 0;
    margin: 0 auto;
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    color: #5b5b5b;
    margin-bottom: 55px;
  }
  .btn-wrapper {
    margin-bottom: 20px;
  }

  @media (max-width: 850px) {
    margin-top: 35px;
    margin-bottom: 0;
    font-size: 16px;
    width: 80%;
    .login-wrapper {
      padding: 50px 40px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 37px;
    }
    .btn-wrapper {
      margin-bottom: 10px;
    }
  }
`;

const LoginForm = styled.form`
  .input_form.id {
    margin-bottom: 14px;
  }
  .label-wrapper {
    display: flex;
    label {
      margin: 44px 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      input {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 15px;
        @media (max-width: 850px) {
          width: 20px;
          height: 20px;
        }
      }
      @media (max-width: 850px) {
        margin: 22px 0;
      }
    }
  }
`;

const Others = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 50px 0;
  .option {
    cursor: pointer;
  }
  @media (max-width: 850px) {
    padding: 20px 0;
  }
`;

const SocialLogins = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  color: rgba(132, 132, 132, 0.78);
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
  }
`;

export default Login;
