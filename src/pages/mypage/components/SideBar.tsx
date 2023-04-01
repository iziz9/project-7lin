import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import ChangeInfoModal from "./ChangeInfoModal";
import WithdrawlModal from "./WithdrawlModal";

const SideBar = () => {
  const { pathname } = useLocation();

  const { openModal } = useModal();

  const changeInfoModalData = {
    title: "정보 수정",
    content: <ChangeInfoModal />,
  };

  const withdrawalModalData = {
    title: "회원탈퇴",
    content: <WithdrawlModal />,
  };

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
        <li
          className="link"
          onClick={() => {
            console.log("hi");
            openModal(changeInfoModalData);
          }}
        >
          정보수정
        </li>
        <li className="link" onClick={() => openModal(withdrawalModalData)}>
          회원탈퇴
        </li>
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
      cursor: pointer;

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
