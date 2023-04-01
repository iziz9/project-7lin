import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const SideBar = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <SideBarStyle>
      <ul>
        <NavLink
          to={"/mypage/reservation"}
          className={({ isActive }) => {
            return isActive || pathname === "/mypage" ? "link active" : "link";
          }}
        >
          예약내역
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "link active" : "link";
          }}
          to={"/mypage/favor"}
        >
          찜
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "link active" : "link";
          }}
          to={"/mypage/point"}
        >
          포인트
        </NavLink>
        {/* <NavLink>정보수정</NavLink> */}
        {/* <NavLink>회원탈퇴</NavLink> */}
      </ul>
    </SideBarStyle>
  );
};

const SideBarStyle = styled.div`
  font-weight: 600;
  ul {
    .link {
      display: block;
      padding: 11px 0;
      word-break: keep-all;

      &.active {
        color: #0d99ff;
      }

      &:first-child {
        padding-top: 0;
      }
    }
  }
`;

export default SideBar;
