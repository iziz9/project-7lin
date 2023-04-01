import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router";
import {
  FaHome,
  FaSuitcaseRolling,
  FaSearch,
  FaBullhorn,
  FaUserAlt,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:849px)",
  });

  const navMenu = [
    {
      title: "홈",
      pathname: "/",
      color: location === "/" ? "blue" : "darkGray",
      icon: <FaHome className={location === "/" ? "blue" : "darkGray"} />,
    },
    {
      title: "검색",
      pathname: "/search",
      color: location === "/search" ? "blue" : "darkGray",
      icon: (
        <FaSearch className={location === "/search" ? "blue" : "darkGray"} />
      ),
    },
    {
      title: "여행",
      pathname: "/groups",
      color: location === "/groups" ? "blue" : "darkGray",
      icon: (
        <FaSuitcaseRolling
          className={location === "/groups" ? "blue" : "darkGray"}
        />
      ),
    },
    {
      title: "공지사항",
      pathname: "/notice",
      color: location === "/notice" ? "blue" : "darkGray",
      icon: (
        <FaBullhorn className={location === "/notice" ? "blue" : "darkGray"} />
      ),
    },
    {
      title: "마이페이지",
      pathname: "/mypage",
      color: location === "/mypage" ? "blue" : "darkGray",
      icon: (
        <FaUserAlt className={location === "/mypage" ? "blue" : "darkGray"} />
      ),
    },
  ];

  return (
    <>
      {isMobile ? (
        <MobileFooterContainer>
          <ul>
            {navMenu.map((menu) => (
              <li
                onClick={() => {
                  navigate(menu.pathname);
                }}
                key={menu.pathname}
              >
                {menu.icon}
                <span className={menu.color}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </MobileFooterContainer>
      ) : (
        <PcFooterContainer>
          <Inner>
            <FooterNav>
              <ul>
                <li>안심카드결제</li>
                <li>이용약관</li>
                <li>개인정보 처리방침</li>
                <li>여행약관</li>
              </ul>
            </FooterNav>
            <SocialLink>
              <div className="logo">
                <img src="/logo_shiny.png" />
              </div>
              <div className="social">
                <div className="icon">
                  <img src="/footer-youtube.png" />
                </div>
                <div className="icon">
                  <img src="/footer-insta.png" />
                </div>
                <div className="icon">
                  <img src="/footer-blog.png" />
                </div>
                <div className="icon">
                  <img src="/footer-facebook.png" />
                </div>
                <div className="icon">
                  <img src="/footer-link.png" />
                </div>
              </div>
            </SocialLink>
            <Information>
              <div className="help">
                <div className="info-title">고객지원실</div>
                <div className="phone">02-6105-7711</div>
                <div>
                  <div>영업시간 : 09:00 ~ 18:00</div>
                  <div>토/일요일 및 공휴일 휴무</div>
                </div>
              </div>
              <div className="bank">
                <div className="info-title">입금계좌</div>
                <span>KEB하나은행</span>
                <span>267-910020-36604</span>
                <span>(주)더샤이니</span>
              </div>
            </Information>
            <Policy>
              <div>
                <span>
                  상호명: (주)더샤이니ㅣ대표: 김소영ㅣ개인정보보호책임자:
                  김승덕ㅣ주소: 서울특별시 중구 청계천로40, 한국관광공사
                  서울센터 818호
                </span>
                <br />
                <span>
                  사업자등록번호: 495-87-02492ㅣ통신판매업신고번호:
                  2021-서울중구-2450ㅣ이메일: gotogether@shinytravels.com
                </span>
              </div>
              <div>
                <span>
                  고투게더 서비스 내 결제 발생 시 고객상담, 취소, 환불 등의
                  거래에 대하여 책임을 집니다.
                </span>
                <br />
                <span>
                  고투게더는 통신판매중개자이며 통신판매의 당사자가 아닙니다.
                  따라서 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다.
                </span>
                <br />
                <span>Copyright ⓒ 2023 고투게더 All rights reserved.</span>
              </div>
            </Policy>
          </Inner>
        </PcFooterContainer>
      )}
    </>
  );
};

const MobileFooterContainer = styled.footer`
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;

  .blue {
    color: var(--color-blue);
  }

  ul {
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;

    li {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 12px;
      cursor: pointer;

      svg {
        width: 29px;
        height: 29px;
        margin: auto;
      }

      span {
        margin: auto;
      }
    }
  }
`;

const PcFooterContainer = styled.footer`
  background-color: #f5f5f5;
  width: 100%;
  margin-top: 60px;
  bottom: 0;
  color: var(--color-blue);
  line-height: 20px;
`;
const Inner = styled.div`
  max-width: 1240px;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const FooterNav = styled.section`
  ul {
    display: flex;
    gap: 30px;
    padding: 10px 20px;

    li {
      cursor: pointer;
    }
  }
`;
const SocialLink = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .logo {
    img {
      width: 200px;
    }
  }
  .social {
    display: flex;
    gap: 10px;

    .icon {
      cursor: pointer;
    }
  }
`;
const Information = styled.section`
  display: flex;
  margin-top: 10px;
  gap: 60px;

  .help {
    position: relative;
    padding-right: 100px;

    ::after {
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      right: -40px;
      width: 2px;
      background-color: var(--color-blue);
    }

    .phone {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  .bank {
    padding-left: 20px;
  }

  .info-title {
    margin-bottom: 20px;
  }
`;

const Policy = styled.section`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Footer;
