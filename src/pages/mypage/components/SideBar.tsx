import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import ChangeInfoModal from "./ChangeInfoModal";
import WithdrawlModal from "./WithdrawlModal";
import Modal from "../../../commons/Modal";

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
          to={"/mypage/myreservation"}
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
            openModal(changeInfoModalData);
          }}
        >
          정보수정
        </li>
        <li className="link" onClick={() => openModal(withdrawalModalData)}>
          회원탈퇴
        </li>
      </ul>
      <Modal />
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

  @media (max-width: 850px) {
    position: absolute;
    top: 0px;
    background: #fff;
    display: flex;
    font-size: 16px;
    width: 100%;
    ul {
      display: flex;
      align-items: center;
      width: 100%;
      white-space: nowrap;

      .link {
        padding: 12px 12px;
        /* width: 20%; */
        flex-grow: 1;
        text-align: center;

        &:first-child {
          padding-top: 12px;
        }
        &.active {
          border-bottom: 2px solid #0d99ff;
        }
      }
    }
  }
`;

export default SideBar;
