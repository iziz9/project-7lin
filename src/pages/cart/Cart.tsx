import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { BiMinus, BiPlus } from "react-icons/bi";
import styled from "styled-components";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";
import ProductDetailModal from "../product-detail/ProductDetailModal";
import { useMediaQuery } from "react-responsive";
import {
  CartState,
  IProductDetailDataOptions,
  IProductDetailDataPeriod,
  IProductDetailSelectOption,
} from "./../../@types/data.d";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CartState[]>([]);

  useEffect(() => {
    const storageData: CartState[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setData([...storageData]);
  }, []);

  const { openModal, closeModal } = useModal();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const [select, setSelect] = useState<number[]>([]);

  // 전체 체크
  const onChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const ids: number[] = [];
      data.forEach((item: CartState) => ids.push(item.productId));
      setSelect(ids);
    } else {
      setSelect([]);
    }
  };

  // 선택 체크
  const onChangeEach = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelect((prev) => [...prev, id]);
    } else {
      setSelect((prev) => [...prev].filter((i) => i !== id));
    }
  };

  // 옵션 변경
  const handleModal = (
    id: number,
    image: string,
    title: string,
    price: number,
    options: IProductDetailDataOptions[],
    period: IProductDetailDataPeriod[],
  ) => {
    openModal({
      title: "옵션 변경",
      content: (
        <ProductDetailModal
          id={id || 0}
          image={image || ""}
          title={title || ""}
          price={price || 0}
          closeModal={closeModal || ""}
          type="변경"
          options={options}
          period={period}
        />
      ),
    });
  };

  // 엑스버튼 삭제
  const handleDelete = (
    productId: number,
    isProduct: boolean,
    optionId?: number,
  ) => {
    if (isProduct) {
      const restProducts = data.filter(
        (item: CartState) => item.productId !== productId,
      );
      localStorage.setItem("cart", JSON.stringify([...restProducts]));
    } else {
      const [prevProduct] = data.filter(
        (item: CartState) => item.productId === item.productId,
      );
      const restProducts = data.filter(
        (item: CartState) => item.productId !== productId,
      );
      const restOption = prevProduct.selectOptions?.filter(
        (item: IProductDetailSelectOption) => item.optionId !== optionId,
      );

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...restProducts,
          {
            productId: prevProduct.productId,
            title: prevProduct.title,
            image: prevProduct.image,
            productPrice: prevProduct.productPrice,
            totalPrice: prevProduct.totalPrice,
            selectPeriod: { ...prevProduct.selectPeriod },
            selectOptions: restOption ? [...restOption] : null,
            allOption: [...prevProduct.allOption],
            allPeriod: [...prevProduct.allPeriod],
          },
        ]),
      );
    }

    const storageData: CartState[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setData([...storageData]);
  };

  // 선택 상품 삭제
  const handleCheckDelete = () => {
    for (const productId of select) {
      const storageData: CartState[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      const restProducts = storageData.filter(
        (item: CartState) => item.productId !== productId,
      );
      localStorage.setItem("cart", JSON.stringify([...restProducts]));
      setSelect((prev: number[]) => [
        ...prev.filter((item: number) => item !== productId),
      ]);
    }

    const storageData: CartState[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setData([...storageData]);
  };

  // 수량
  const onClickMinus = (id: number) => {
    const [prevProduct] = data.filter(
      (item: CartState) => item.productId === id,
    );
    const copyData = [...data];
    const prevProductIndex = copyData.findIndex(
      (item: CartState) => item.productId === id,
    );

    const minusData = {
      productId: prevProduct.productId,
      title: prevProduct.title,
      image: prevProduct.image,
      productPrice: prevProduct.productPrice,
      totalPrice: prevProduct.totalPrice,
      selectPeriod: {
        periodId: prevProduct.selectPeriod.periodId,
        content: prevProduct.selectPeriod.content,
        amount:
          prevProduct.selectPeriod.amount === 1
            ? 1
            : prevProduct.selectPeriod.amount - 1,
      },
      selectOptions: prevProduct.selectOptions
        ? [...prevProduct.selectOptions]
        : null,
      allOption: [...prevProduct.allOption],
      allPeriod: [...prevProduct.allPeriod],
    };

    copyData.splice(prevProductIndex, 1, minusData);

    localStorage.setItem("cart", JSON.stringify(copyData));

    const storageData: CartState[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setData([...storageData]);
  };

  const onClickPlus = (id: number) => {
    const [prevProduct] = data.filter(
      (item: CartState) => item.productId === id,
    );
    const copyData = [...data];
    const prevProductIndex = copyData.findIndex(
      (item: CartState) => item.productId === id,
    );

    const plusData = {
      productId: prevProduct.productId,
      title: prevProduct.title,
      image: prevProduct.image,
      productPrice: prevProduct.productPrice,
      totalPrice: prevProduct.totalPrice,
      selectPeriod: {
        periodId: prevProduct.selectPeriod.periodId,
        content: prevProduct.selectPeriod.content,
        amount: prevProduct.selectPeriod.amount + 1,
      },
      selectOptions: prevProduct.selectOptions
        ? [...prevProduct.selectOptions]
        : null,
      allOption: [...prevProduct.allOption],
      allPeriod: [...prevProduct.allPeriod],
    };

    copyData.splice(prevProductIndex, 1, plusData);

    localStorage.setItem("cart", JSON.stringify(copyData));

    const storageData: CartState[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setData([...storageData]);
  };

  // 예약하기
  const handleReservation = (id: number) => {
    const [product] = data.filter((item: CartState) => item.productId === id);

    if (confirm("예약하시겠습니까?")) {
      navigate("/reservation", {
        state: {
          productId: product.productId,
          title: product.title,
          image: product.image,
          productPrice: product.productPrice,
          totalPrice: product.totalPrice,
          periods: { ...product.selectPeriod },
          options: product.selectOptions,
        },
      });
    } else {
      navigate("/cart");
    }
  };

  let reservationPrice = 0;
  for (const item of data) {
    reservationPrice += item.totalPrice;
  }

  return (
    <>
      {isMobile ? (
        <Wrap>
          <MobHead>
            <h1>장바구니</h1>
            <span>{data.length}</span>
          </MobHead>
          <MobDelete>
            <label htmlFor="check_all">
              <input
                type="checkbox"
                id="check_all"
                onChange={onChangeTotal}
                checked={data.length === select.length ? true : false}
              />
              <span></span>
            </label>
            <div>
              <button onClick={handleCheckDelete}>선택 상품 삭제</button>
              {/* <button>품절 상품 삭제</button> 품절 정보 없음 */}
            </div>
          </MobDelete>
          <MobProducts>
            {data && data.length === 0 ? (
              <p>장바구니에 상품이 없습니다</p>
            ) : (
              data.map((item: CartState) => (
                <MobProduct key={item.productId}>
                  <label htmlFor={`check_each_${item.productId}`}>
                    <input
                      type="checkbox"
                      id={`check_each_${item.productId}`}
                      onChange={(e) => onChangeEach(item.productId, e)}
                      checked={select.includes(item.productId) ? true : false}
                    />
                    <span></span>
                  </label>
                  <div>
                    <MobProductHead>
                      <img src={item.image} alt="상품 이미지" />
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.totalPrice.toLocaleString()}원</p>
                      </div>
                      <IoMdClose
                        size={25}
                        onClick={() => handleDelete(item.productId, true)}
                      />
                    </MobProductHead>

                    <MobOption>
                      <strong>필수</strong>
                      <span>
                        {item.selectPeriod.content} - {item.selectPeriod.amount}
                        개
                      </span>
                    </MobOption>

                    {item.selectOptions &&
                      item.selectOptions.map(
                        (optionItem: IProductDetailSelectOption) => (
                          <MobOption key={optionItem.optionId}>
                            <strong>추가</strong>
                            <span>
                              {optionItem.content} - {optionItem.amount}개
                            </span>
                            <IoMdClose
                              onClick={() =>
                                handleDelete(
                                  item.productId,
                                  false,
                                  optionItem.optionId,
                                )
                              }
                            />
                          </MobOption>
                        ),
                      )}
                    <MobEachBtns>
                      <button
                        onClick={() =>
                          handleModal(
                            item.productId,
                            item.image,
                            item.title,
                            item.productPrice,
                            item.allOption,
                            item.allPeriod,
                          )
                        }
                      >
                        옵션/수량 변경
                      </button>
                      <button onClick={() => handleReservation(item.productId)}>
                        예약하기
                      </button>
                    </MobEachBtns>
                  </div>
                </MobProduct>
              ))
            )}
          </MobProducts>
          <MobResArea>
            <div>
              <span>총 주문 상품</span>
              <strong>{data.length}개</strong>
            </div>
            <div>
              <span>총 예약 금액</span>
              <h3>{reservationPrice.toLocaleString()}원</h3>
            </div>
          </MobResArea>
          <MobBtns>
            {/* <button onClick={handleReservation}>예약하기</button> 예약하기 상품 1개만 됨 */}
            <button onClick={() => navigate("/")}>계속 둘러보기</button>
          </MobBtns>
        </Wrap>
      ) : (
        <Wrap>
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
              <input
                type="checkbox"
                id="check_all"
                onChange={onChangeTotal}
                checked={data.length === select.length ? true : false}
              />
              <span></span>
            </label>
            <p>상품 정보</p>
            <p>수량</p>
            <p>예약금액</p>
          </TableHead>

          <TableBody>
            {data && data.length === 0 ? (
              <p>장바구니에 담은 상품이 없습니다.</p>
            ) : (
              data.map((item: CartState) => (
                <TableItem key={item.productId}>
                  <label htmlFor={`check_each_${item.productId}`}>
                    <input
                      type="checkbox"
                      id={`check_each_${item.productId}`}
                      onChange={(e) => onChangeEach(item.productId, e)}
                      checked={select.includes(item.productId) ? true : false}
                    />
                    <span></span>
                  </label>
                  <Product>
                    <img src={item.image} alt="상품 이미지" />
                    <Text>
                      <div>
                        <h3>{item.title}</h3>
                        <IoMdClose
                          size={25}
                          onClick={() => handleDelete(item.productId, true)}
                        />
                      </div>
                      <p>
                        <strong>필수옵션</strong>
                        <span>
                          {item.selectPeriod.content} -{" "}
                          {item.selectPeriod.amount}개
                        </span>
                      </p>
                      {item.selectOptions &&
                        item.selectOptions.map(
                          (optionItem: IProductDetailSelectOption) => (
                            <p key={optionItem.optionId}>
                              <strong>추가옵션</strong>
                              <span>
                                {optionItem.content} - {optionItem.amount}개
                              </span>
                              <IoMdClose
                                onClick={() =>
                                  handleDelete(
                                    item.productId,
                                    false,
                                    optionItem.optionId,
                                  )
                                }
                              />
                            </p>
                          ),
                        )}
                    </Text>
                  </Product>

                  <Personnel>
                    <BiMinus
                      size={20}
                      onClick={() => onClickMinus(item.productId)}
                    />
                    <p>{item.selectPeriod.amount}</p>
                    <BiPlus
                      size={20}
                      onClick={() => onClickPlus(item.productId)}
                    />
                  </Personnel>

                  <Price>
                    <div>
                      <strong>{item.totalPrice.toLocaleString()}원</strong>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleModal(
                            item.productId,
                            item.image,
                            item.title,
                            item.productPrice,
                            item.allOption,
                            item.allPeriod,
                          )
                        }
                      >
                        옵션 변경
                      </button>
                      <button onClick={() => handleReservation(item.productId)}>
                        예약하기
                      </button>
                    </div>
                  </Price>
                </TableItem>
              ))
            )}
          </TableBody>

          <DeleteBtns>
            <button onClick={handleCheckDelete}>선택 상품 삭제</button>
            {/* <button>품절 상품 삭제</button> 품절 정보 없음 */}
          </DeleteBtns>

          <ResultArea>
            <div>
              <h2>예약 예정 금액</h2>
            </div>
            <Middle>
              <p>
                <strong>총 주문 상품</strong>
                <span>{data.length}개</span>
              </p>
              <p>
                <strong>예약 금액</strong>
                <span>{reservationPrice.toLocaleString()}원</span>
              </p>
            </Middle>
            <End>
              <p>
                <strong>총 예약 금액</strong>
                <span>{reservationPrice.toLocaleString()}원</span>
              </p>
            </End>
          </ResultArea>

          <Btns>
            <button onClick={() => navigate("/")}>계속 둘러보기</button>
            {/* <button>예약하기</button> 예약하기 상품 1개만 됨 */}
          </Btns>
        </Wrap>
      )}
      <Modal />
    </>
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
const MobProducts = styled.div``;
const MobProduct = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  :last-child {
    margin-bottom: 0;
  }
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
  width: 90%;
  display: flex;
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
    flex-shrink: 0;
    margin-right: 10px;
  }
  span {
  }
  svg {
    margin-left: auto;
  }
`;
const MobEachBtns = styled.div`
  margin-top: 20px;
  button {
    width: 45%;
    padding: 15px 0;
    font-size: 18px;
    border-radius: 8px;
    @media screen and (max-width: 450px) {
      font-size: 15px;
    }
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
  svg {
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
  > p {
    padding: 100px 0;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
`;
const TableItem = styled.div`
  margin-bottom: 24px;
  padding: 30px 0;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  :last-child {
    margin-bottom: 0;
  }
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
  width: 100%;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
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
      :last-child {
        color: white;
        background-color: var(--color-blue);
        border: 1px solid var(--color-blue);
      }
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
    }
    /* :last-child {
      background-color: var(--color-blue);
      color: white;
    } */
  }
`;

export default Cart;
