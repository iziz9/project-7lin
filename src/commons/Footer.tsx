import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
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
          <a>유튜브</a>
          <a>인스타</a>
          <a>블로그</a>
          <a>페이스북</a>
          <a>링크</a>
        </div>
      </SocialLink>
      <Information>
        <div className="help">
          <div>고객지원실</div>
          <div>02-6105-7711</div>
          <div>
            <div>영업시간 : 09:00 ~ 18:00</div>
            <div>토/일요일 및 공휴일 휴무</div>
          </div>
        </div>
        <div className="bank">
          <div>입금계좌</div>
          <span>KEB하나은행</span>
          <span>267-910020-36604</span>
          <span>(주)더샤이니</span>
        </div>
      </Information>
      <section>
        <div>
          <span>
            상호명: (주)더샤이니ㅣ대표: 김소영ㅣ개인정보보호책임자:
            김승덕ㅣ주소: 서울특별시 중구 청계천로40, 한국관광공사 서울센터
            818호
          </span>
          <br />
          <span>
            사업자등록번호: 495-87-02492ㅣ통신판매업신고번호:
            2021-서울중구-2450ㅣ이메일: gotogether@shinytravels.com
          </span>
        </div>
        <div>
          <span>
            고투게더 서비스 내 결제 발생 시 고객상담, 취소, 환불 등의 거래에
            대하여 책임을 집니다.
          </span>
          <br />
          <span>
            고투게더는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서
            상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다.
          </span>
          <br />
          <span>Copyright ⓒ 2023 고투게더 All rights reserved.</span>
        </div>
      </section>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  padding: 0 50px;
  width: 100%;
  height: 300px;
  color: var(--color-blue);
`;
const FooterNav = styled.section`
  padding: 30px;
  ul {
    display: flex;
    gap: 30px;

    li {
      cursor: pointer;
    }
  }
`;
const SocialLink = styled.section`
  display: flex;
  gap: 30px;

  .logo {
    img {
      width: 200px;
    }
  }
  .social {
    display: flex;
    gap: 10px;
  }
`;
const Information = styled.section`
  display: flex;
  margin-top: 10px;
  gap: 60px;

  .help {
    position: relative;

    ::after {
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      right: -40px;
      width: 3px;
      background-color: var(--color-blue);
    }
  }
  .bank {
  }
`;

export default Footer;
