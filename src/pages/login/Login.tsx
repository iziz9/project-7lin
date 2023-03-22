import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { axiosInstance } from "../../apis/instance";
import { BasicBtn } from "../../commons/Button";
import { BasicInput } from "../../commons/Input";

const Login = () => {
  const isDesktop: boolean = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet: boolean = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:767px)",
  });

  const snsArray = [
    { name: "네이버", img: "sns_naver.svg" },
    { name: "카카오", img: "sns_kakao.svg" },
    { name: "페이스북", img: "sns_facebook.svg" },
  ];
  const socialLogin = snsArray.map((sns) => (
    <div className="social" key={sns.name}>
      <img src={sns.img} alt={sns.name} />
      {isDesktop ? sns.name : ""}
    </div>
  ));

  return (
    <>
      <LoginContainer isDeskTop={isDesktop}>
        <div className="login-wrapper">
          <div className="title">로그인</div>
          <LoginForm>
            <div className="input_form id">
              <BasicInput
                type="text"
                placeholder="아이디"
                isDeskTop={isDesktop}
              />
            </div>
            <div className="input_form password">
              <BasicInput
                type="password"
                placeholder="비밀번호"
                isDeskTop={isDesktop}
              />
            </div>
            <div className="label-wrapper">
              <label>
                <input type="checkbox" />
                로그인 상태 저장
              </label>
            </div>
            <div className="btn-wrapper">
              <BasicBtn type="submit" value="Submit" isDeskTop={isDesktop}>
                로그인
              </BasicBtn>
            </div>
          </LoginForm>
          <div className="btn-wrapper">
            <BasicBtn
              backgroundColor="#8692A5"
              fontColor="#fff"
              isDeskTop={isDesktop}
            >
              비회원 예약 조회
            </BasicBtn>
          </div>
          <Others isDeskTop={isDesktop}>
            <div className="option sign_up">회원가입</div>
            <div className="option find">아이디 / 비밀번호 찾기</div>
          </Others>
          <SocialLogins isDeskTop={isDesktop}>{socialLogin}</SocialLogins>
        </div>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div<{
  isDeskTop: boolean;
}>`
  margin: 0 auto;
  background: #fafafa;
  width: ${(props) => (props.isDeskTop ? "1000px" : "328px")};
  font-size: ${(props) => (props.isDeskTop ? "23px" : "16px")};
  line-height: 100%;
  letter-spacing: -0.02em;
  .login-wrapper {
    padding: ${(props) => (props.isDeskTop ? "130px 150px" : "50px 40px")};
  }
  .title {
    font-weight: bold;
    font-size: ${(props) => (props.isDeskTop ? "55px" : "20px")};
    color: #5b5b5b;
    margin-bottom: ${(props) => (props.isDeskTop ? "55px" : "37px")};
  }
  .btn-wrapper {
    margin-bottom: ${(props) => (props.isDeskTop ? "20px" : "10px")};
  }
`;

const LoginForm = styled.form`
  .input_form.id {
    margin-bottom: 14px;
  }
  .label-wrapper {
    display: flex;
    label {
      margin: 25px 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      input {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 15px;
      }
    }
  }
`;

const Others = styled.div<{
  isDeskTop: boolean;
}>`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => (props.isDeskTop ? "10px 0 50px 0" : "20px 0")};
  .option {
    cursor: pointer;
  }
`;

const SocialLogins = styled.div<{
  isDeskTop: boolean;
}>`
  display: flex;
  justify-content: center;
  gap: 24px;
  color: rgba(132, 132, 132, 0.78);
  .social {
    display: flex;
    align-items: center;
    gap: 19px;
    cursor: pointer;
    img {
      width: ${(props) => (props.isDeskTop ? "50px" : "30px")};
      height: ${(props) => (props.isDeskTop ? "50px" : "30px")};
    }
  }
`;

export default Login;
