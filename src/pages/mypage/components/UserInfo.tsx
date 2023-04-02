import styled from "styled-components";

const UserInfo = () => {
  return (
    <Container>
      <div className="wrapper">
        <div className="img-wrapper">
          <img src="/default_profile.png" />
        </div>
        <div className="info">
          <div className="hi">7lin'님 안녕하세요.</div>
          <div className="money">누적 결제 금액: 3,244,000원</div>
          <div className="point-mobile">포인트: 0</div>
        </div>
        <div className="point-wrapper">
          <div className="point">포인트</div>
          <div className="number">0</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* border: 1px solid blue; */
  /* width: 100%; */
  /* max-width: 900px; */
  /* box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15); */
  border-radius: 8px;
  .wrapper {
    /* padding: 46px; */
    padding-bottom: 46px;
    border-bottom: 1px solid var(--color-grayscale20);
    display: flex;

    .img-wrapper {
      margin-right: 30px;
      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      width: 70%;
      border-right: 1px solid #ebebeb;
      .hi {
        font-size: 23px;
        font-weight: 600;
      }
      .point-mobile {
        display: none;
      }
    }

    .point-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      /* padding-left: 65px; */
      flex-grow: 1;

      .point {
        word-break: keep-all;
      }

      .number {
        font-size: 30px;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 850px) {
    font-size: 16px;

    .wrapper {
      padding-bottom: 30px;
      .info {
        border-right: none;
        .hi {
          font-size: 20px;
        }
        .point-mobile {
          display: block;
        }
      }

      .point-wrapper {
        display: none;
      }
    }
  }
`;

export default UserInfo;
