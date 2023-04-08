import React from "react";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { BiMinus, BiPlus } from "react-icons/bi";
import styled from "styled-components";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";
import ProductDetailModal from "../product-detail/ProductDetailModal";
import { useMediaQuery } from "react-responsive";

const Cart = () => {
  const { openModal, closeModal } = useModal();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const handleModal = () => {
    openModal({
      title: "옵션 변경",
      content: (
        <ProductDetailModal
          image={"/product_img.png"}
          title={"중앙아시아 3국 15일 중앙아시아 3국 15일 중앙아시아 3국 15일"}
          price={"2,860,000"}
          closeModal={closeModal}
          type="변경"
        />
      ),
    });
  };

  return (
    <Wrap>
      {isMobile ? (
        <>
          <MobHead>
            <h1>장바구니</h1>
            <span>12</span>
          </MobHead>
          <MobDelete>
            <label htmlFor="check_all">
              <input type="checkbox" id="check_all" />
              <span></span>
            </label>
            <div>
              <button>선택 상품 삭제</button>
              <button>품절 상품 삭제</button>
            </div>
          </MobDelete>
          <MobProduct>
            <label htmlFor="check_each">
              <input type="checkbox" id="check_each" />
              <span></span>
            </label>
            <div>
              <MobProductHead>
                <img src="/product_img.png" alt="상품 이미지" />
                <div>
                  <h2>중앙아시아 3국 15일</h2>
                  <p>2,860,000원</p>
                </div>
                <IoMdClose size={25} />
              </MobProductHead>
              <MobOption>
                <strong>필수</strong>
                <span>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</span>
              </MobOption>
              <MobOption>
                <strong>추가</strong>
                <span>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</span>
              </MobOption>
              <MobOption>
                <strong>추가</strong>
                <span>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</span>
              </MobOption>
              <MobEachBtns>
                <button onClick={handleModal}>옵션/수량 변경</button>
                <button>예약하기</button>
              </MobEachBtns>
            </div>
          </MobProduct>
          <MobResArea>
            <div>
              <span>총 주문 상품</span>
              <strong>1개</strong>
            </div>
            <div>
              <span>총 예약 금액</span>
              <h3>2,860,000원</h3>
            </div>
          </MobResArea>
          <MobBtns>
            <button>예약하기</button>
            <button>계속 둘러보기</button>
          </MobBtns>
        </>
      ) : (
        <>
          <Head>
            <h1>장바구니</h1>
            <div>
              <strong>장바구니</strong>
              <IoIosArrowForward color="#8E8E93" />
              <span>결제하기</span>
              <IoIosArrowForward color="#8E8E93" />
              <span>완료</span>
            </div>
          </Head>

          <TableHead>
            <label htmlFor="check_all">
              <input type="checkbox" id="check_all" />
              <span></span>
            </label>
            <p>상품 정보</p>
            <p>수량</p>
            <p>예약금액</p>
          </TableHead>

          <TableBody>
            <TableItem>
              {/* 10, 50, 15, 25 */}
              <label htmlFor="check_each">
                <input type="checkbox" id="check_each" />
                <span></span>
              </label>
              <Product>
                <img src="/product_img.png" alt="상품 이미지" />
                <Text>
                  <div>
                    <h3>
                      중앙아시아 3국 15일 중앙아시아 3국 15일 중앙아시아 3국
                      15일
                    </h3>
                    <IoMdClose size={25} />
                  </div>
                  <p>
                    <strong>필수옵션</strong>
                    <span>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</span>
                    <IoMdClose />
                  </p>
                  <p>
                    <strong>추가옵션</strong>
                    <span>1인 싱글룸 사용시 추가 - 3개</span>
                    <IoMdClose />
                  </p>
                </Text>
              </Product>

              <Personnel>
                <BiMinus size={20} />
                <p>212</p>
                <BiPlus size={20} />
              </Personnel>

              <Price>
                <div>
                  <strong>2,860,000원</strong>
                </div>
                <div>
                  <button onClick={handleModal}>옵션 변경</button>
                </div>
              </Price>
            </TableItem>
          </TableBody>

          <DeleteBtns>
            <button>선택 상품 삭제</button>
            <button>품절 상품 삭제</button>
          </DeleteBtns>

          <ResultArea>
            <div>
              <h2>예약 예정 금액</h2>
            </div>
            <Middle>
              <p>
                <strong>총 주문 상품</strong>
                <span>1개</span>
              </p>
              <p>
                <strong>예약 금액</strong>
                <span>2,860,000원</span>
              </p>
            </Middle>
            <End>
              <p>
                <strong>총 예약 금액</strong>
                <span>2,860,000원</span>
              </p>
            </End>
          </ResultArea>

          <Btns>
            <button>계속 둘러보기</button>
            <button>예약하기</button>
          </Btns>
        </>
      )}

      <Modal />
    </Wrap>
  );
};

// 모바일
const MobHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  h1 {
    margin-right: 10px;
    font-size: 25px;
    font-weight: bold;
  }
  span {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    border-radius: 100%;
    background-color: var(--color-blue);
    color: white;
  }
`;
const MobDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  button {
    margin-left: 10px;
    padding: 10px 25px;
    border: none;
    background-color: #f5f5f5;
    color: #5b5b5b;
    border-radius: 8px;
  }
`;
const MobProduct = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  > div {
    width: 100%;
    margin-left: 10px;
  }
`;
const MobProductHead = styled.div`
  display: flex;
  margin-bottom: 10px;
  img {
    width: 70px;
    height: 70px;
    margin-right: 20px;
    border-radius: 8px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      color: var(--color-blue);
      font-weight: bold;
      font-size: 20px;
    }
  }
  svg {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
const MobOption = styled.p`
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 10px;
  line-height: 18px;
  color: #48484a;
  :first-of-type {
    strong {
      color: var(--color-blue);
    }
  }
  :last-child {
    margin-bottom: 0;
  }
  strong {
    margin-right: 10px;
  }
  span {
  }
`;
const MobEachBtns = styled.div`
  margin-top: 20px;
  button {
    width: 45%;
    padding: 15px 0;
    font-size: 18px;
    border-radius: 8px;
    :first-child {
      margin-right: 10px;
      color: #48484a;
      background-color: white;
      border: 1px solid #8e8e93;
    }
    :last-child {
      background-color: var(--color-blue);
      color: white;
      border: 1px solid var(--color-blue);
    }
  }
`;
const MobResArea = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 24px 18px;
  background-color: #f5f5f5;
  border-radius: 8px;

  div {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    :first-child {
      margin-bottom: 20px;
    }
  }
  span {
    color: #8e8e93;
  }
  strong {
    color: #111111;
  }
  h3 {
    color: var(--color-blue);
    font-weight: bold;
  }
`;
const MobBtns = styled.div`
  margin-top: 20px;
  button {
    width: 100%;
    padding: 15px 0;
    font-size: 20px;
    border-radius: 8px;
    font-weight: bold;
    :first-child {
      color: white;
      background-color: var(--color-blue);
      border: 1px solid var(--color-blue);
    }
    :last-child {
      margin-top: 12px;
      color: #48484a;
      background-color: white;
      border: 1px solid #8e8e93;
    }
  }
`;

// pc
const Wrap = styled.div`
  width: 100%;
  margin: 100px 0;
  padding: 0 10px;
  box-sizing: border-box;

  label {
    width: 7%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    input[type="checkbox"] {
      display: none;
      :checked + span {
        background: url("cart_cheack_icon.svg") no-repeat center;
        border: none;
      }
    }
    span {
      width: 18px;
      height: 18px;
      border: 1px solid #48484a;
      border-radius: 100%;
    }
  }
  * {
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
  }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    font-size: 23px;
    strong {
      font-weight: bold;
      color: #48484a;
    }
    span {
      margin-left: 15px;
      color: #8e8e93;
    }
    svg {
      margin-left: 15px;
    }
  }
`;
const TableHead = styled.div`
  width: 100%;
  height: 83px;
  margin-top: 44px;
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;

  p {
    font-size: 18px;
    :nth-of-type(1) {
      width: 53%;
    }
    :nth-of-type(2) {
      width: 15%;
      text-align: center;
    }
    :nth-of-type(3) {
      width: 25%;
      padding-left: 3.5%;
    }
  }
`;
const TableBody = styled.div`
  width: 100%;
  margin-top: 24px;
  box-sizing: border-box;
`;
const TableItem = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  label {
    align-self: flex-start;
  }
  > div {
    :nth-of-type(1) {
      width: 53%;
    }
    :nth-of-type(2) {
      width: 15%;
    }
    :nth-of-type(3) {
      width: 25%;
    }
  }
`;
const Product = styled.div`
  box-sizing: border-box;
  display: flex;
  border-right: 1px solid #bbbbc2;
  img {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    margin-right: 30px;
  }
`;
const Text = styled.div`
  padding-right: 25px;
  box-sizing: border-box;

  > div {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 23px;
      font-weight: bold;
    }
    svg {
      margin-right: 5px;
      flex-shrink: 0;
    }
  }
  p {
    display: flex;
    margin-bottom: 8px;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    :nth-of-type(1) strong {
      color: var(--color-blue);
    }
    :last-child {
      margin-bottom: 0;
    }
    strong {
      margin-right: 17px;
      flex-shrink: 0;
    }
    span {
    }
    svg {
      margin-left: auto;
      flex-shrink: 0;
    }
  }
`;
const Personnel = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #bbbbc2;
  svg {
    border: 1px solid var(--color-blue);
    border-radius: 100%;
    color: var(--color-blue);
    cursor: pointer;
  }
  p {
    width: 35px;
    margin: 0 5px;
    text-align: center;
    font-size: 18px;
  }
`;
const Price = styled.div`
  display: flex;
  align-self: stretch;

  div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    :first-child {
      border-right: 1px solid #bbbbc2;
    }
    button {
      width: 70%;
      padding: 10px 0;
      border: 1px solid #48484a;
      border-radius: 8px;
      outline: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;
const DeleteBtns = styled.div`
  margin-top: 24px;
  margin-bottom: 50px;
  button {
    margin-right: 10px;
    padding: 10px 30px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: #f5f5f5;
    color: #48484a;
  }
`;
const ResultArea = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 25px 0;
  div {
    width: 33%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #bbbbc2;
    :last-child {
      border-right: none;
    }
    h2 {
      font-size: 30px;
      font-weight: bold;
    }
  }
`;
const Middle = styled.div`
  p {
    width: 80%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    margin-bottom: 30px;
    :last-child {
      margin-bottom: 0;
    }
    strong {
      color: #8e8e93;
    }
    span {
      font-weight: bold;
    }
  }
`;
const End = styled.div`
  p {
    display: flex;
    flex-direction: column;
    strong {
      margin-bottom: 20px;
      color: #8e8e93;
      font-size: 23px;
    }
    span {
      font-size: 30px;
      font-weight: bold;
      color: var(--color-blue);
    }
  }
`;
const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
    width: 30%;
    padding: 20px 0;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 23px;
    font-weight: bold;
    :first-child {
      background-color: #f5f5f5;
      color: #5b5b5b;
      margin-right: 16px;
    }
    :last-child {
      background-color: var(--color-blue);
      color: white;
    }
  }
`;

export default Cart;
