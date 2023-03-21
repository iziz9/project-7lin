import React from "react";
import { Navigate, useNavigate } from "react-router";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const navMenu = [
    "여행추천",
    "그룹별여행",
    "지역별여행",
    "테마별여행",
    "여행후기",
    "공지사항",
  ];

  return (
    <HeaderContainer>
      <TopSection>
        <div className="searchSection">
          <div>
            <img src="/logo_text.png" onClick={() => navigate("/")} />
          </div>
          <input type="text" placeholder="검색어를 입력해주세요" />
        </div>
        <ul>
          <li>null/알림</li>
          <li>장바구니</li>
          <li>로그인/로그아웃</li>
          <li>회원가입</li>
        </ul>
      </TopSection>
      <NavMenu>
        <ul>
          {navMenu.map((menu) => (
            <li key={menu}>{menu}</li>
          ))}
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  border-bottom: 2px solid gray;
  padding: 20px 30px;
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-between;

  .searchSection {
    display: flex;
    gap: 20px;

    div {
      img {
        width: 200px;
        :hover {
          cursor: pointer;
        }
      }
    }

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
  }

  ul {
    display: flex;
    gap: 10px;
    font-size: 14px;
  }
  li {
    cursor: pointer;
    :hover {
      color: var(--color-blue);
    }
  }
`;

const NavMenu = styled.nav`
  ul {
    display: flex;
    gap: 10px;
  }

  li {
    cursor: pointer;
    padding: 1rem;
    position: relative;

    ::after {
      content: "";
      position: absolute;
      left: 0.5rem;
      bottom: -1rem;
      width: 100px;
      // transform: scaleX(0);
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

    :: after {
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 500ms ease, margin-left 0.5s ease;
    }
  }
`;

export default Header;
