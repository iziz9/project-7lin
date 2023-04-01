import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import UserInfo from "./components/UserInfo";

const MyPage = () => {
  return (
    <Container>
      <SideBar />
      <div className="content">
        <UserInfo />
        <div className="outlet-wrapper">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 110px;
  padding-top: 100px;
  padding-right: 20px;
  padding-left: 20px;
  font-style: normal;
  font-size: 18px;
  height: 100%;
  /* margin: 0 auto; */
  /* background: #fafafa; */
  .content {
    /* border: 1px solid green; */
    padding-left: 46px;
    width: 900px;

    .outlet-wrapper {
      padding-top: 46px;
    }
  }
`;

export default MyPage;
