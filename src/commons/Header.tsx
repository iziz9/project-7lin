import React from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { BsSearch } from "react-icons/bs";
import { SlBag, SlLogin, SlLogout } from "react-icons/sl";
import { useRecoilState } from "recoil";
import { userInfoState } from "../store/userInfoAtom";
import { loginState } from "../store/loginAtom";
import { removeLocalStorage } from "../utils/localStorage";
import { removeCookie } from "../utils/cookie";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  const navMenu = [
    {
      title: "여행추천",
      pathname: "/recommend",
      color: location === "/recommend" || location === "/test" ? "on-page" : "",
    },
    {
      title: "그룹별여행",
      pathname: "/groups",
      color: location === "/groups" ? "on-page" : "",
    },
    {
      title: "지역별여행",
      pathname: "/",
      color: location === "/" ? "on-page" : "",
    },
    {
      title: "테마별여행",
      pathname: "/",
      color: location === "/" ? "on-page" : "",
    },
    {
      title: "여행후기",
      pathname: "/review",
      color: location === "/review" ? "on-page" : "",
    },
    {
      title: "공지사항",
      pathname: "/notice",
      color: location === "/notice" ? "on-page" : "",
    },
  ];

  const handleLogout = () => {
    if (confirm("정말로 로그아웃 하시겠습니까?")) {
      // logout api 추가
      setLoginStatus({ isLogin: false });
      setUserInfo({ email: "", name: "", gender: "", age: 0 });
      removeLocalStorage("loginStatus");
      removeLocalStorage("userInfo");
      removeCookie("accessToken", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      navigate("/");
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileHeaderContainer>
          <div className="inner">
            <img
              src="/logo_text.png"
              alt="로고"
              onClick={() => navigate("/")}
            />
            <div className="iconbox">
              <SlBag className="icons" />
              <SlLogin className="icons" onClick={() => navigate("/login")} />
            </div>
          </div>
        </MobileHeaderContainer>
      ) : (
        <PcHeaderContainer>
          <TopSection>
            <div className="inner">
              <div className="logo-search">
                <div className="logo">
                  <img src="/logo_text.png" onClick={() => navigate("/")} />
                </div>
                <div className="searchBar">
                  <input type="text" placeholder="검색어를 입력해주세요" />
                  <BsSearch className="searchButton" />
                </div>
              </div>
              <ul>
                <li>알림</li>
                <li>장바구니</li>
                {loginStatus.isLogin ? (
                  <li onClick={handleLogout}>로그아웃</li>
                ) : (
                  <li onClick={() => navigate("/login")}>로그인</li>
                )}
                {loginStatus.isLogin ? (
                  <li onClick={() => navigate("/mypage")}>마이페이지</li>
                ) : (
                  <li onClick={() => navigate("/signup_type")}>회원가입</li>
                )}
              </ul>
            </div>
          </TopSection>
          <NavMenu>
            <ul>
              {navMenu.map((menu) => (
                <li
                  key={menu.title}
                  onClick={() => navigate(menu.pathname)}
                  className={menu.color}
                >
                  {menu.title}
                </li>
              ))}
            </ul>
          </NavMenu>
        </PcHeaderContainer>
      )}
    </>
  );
};

const MobileHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: aliceblue;

  .inner {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;

    img {
      width: 119px;
      height: 20px;
      padding-top: 10px;
      cursor: pointer;
    }

    .iconbox {
      display: flex;
      gap: 20px;
      text-align: center;
      margin: auto 0;

      .icons {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }
  }
`;

const PcHeaderContainer = styled.header`
  border-bottom: 2px solid var(--color-inputGray);
  padding: 20px 20px 0;
`;

const TopSection = styled.section`
  max-width: 1240px;
  min-width: 700px;
  margin: auto;

  .inner {
    display: flex;
    justify-content: space-between;
  }

  .logo-search {
    display: flex;
    gap: 20px;

    .logo {
      img {
        width: 200px;
        :hover {
          cursor: pointer;
        }
      }
    }

    .searchBar {
      position: relative;

      input {
        width: 300px;
        height: 30px;
        padding: 5px;
        background-color: var(--color-inputGray);
        border: none;
        :focus {
          outline: none;
        }
        ::placeholder {
          padding-left: 10px;
        }
      }

      .searchButton {
        position: absolute;
        right: 0;
        top: 10px;
        padding-right: 10px;
        color: gray;
        cursor: pointer;
      }
    }
  }

  ul {
    display: flex;
    gap: 10px;
    font-size: 14px;
    white-space: nowrap;
  }

  li {
    cursor: pointer;
    :hover {
      color: var(--color-blue);
    }
  }
`;

const NavMenu = styled.nav`
  max-width: 1240px;
  margin: 20px auto 0;

  ul {
    display: flex;
    gap: 10px;
    white-space: nowrap;
  }

  li {
    cursor: pointer;
    padding: 16px 16px 16px 0;
    position: relative;

    ::after {
      content: "";
      position: absolute;
      left: -8px;
      width: 100%;
    }

    :hover {
      color: var(--color-blue);

      ::after {
        transform: scaleX(1);
        margin-left: 0;
        content: "";
        position: absolute;
        bottom: -2px;
        height: 3px;
        background-color: var(--color-blue);
        transition: transform 500ms ease;
        transform-origin: left;
      }
    }

    ::after {
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 500ms ease, margin-left 0.5s ease;
    }
  }

  .on-page {
    color: var(--color-blue);

    ::after {
      transform: scaleX(1);
      margin-left: 0;
      content: "";
      position: absolute;
      bottom: -2px;
      height: 3px;
      background-color: var(--color-blue);
      transition: transform 500ms ease;
      transform-origin: left;
    }
  }
`;

export default Header;
