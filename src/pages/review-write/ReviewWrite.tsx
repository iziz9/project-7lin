import React, { useState, useRef } from "react";
import BreadCrumb from "../../commons/Breadcrumb";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ProductInfosCard from "./../../commons/ProductInfosCard";
import { useMediaQuery } from "react-responsive";

interface IImgData {
  content: string;
  isWidthLarger: boolean;
}

const ReviewWrite = () => {
  const [imgFile, setImgFile] = useState<IImgData[]>([]);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const saveImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = event.target.files!;
    const reader: any = new FileReader();
    const _URL = window.URL || window.webkitURL;
    const img = new Image();

    if (!file[0]) return;
    reader.readAsDataURL(file[0]);
    img.src = _URL.createObjectURL(file[0]);

    reader.onloadend = () => {
      img.onload = function () {
        if (img.width > img.height)
          setImgFile((prev: IImgData[]) => [
            ...prev,
            { content: reader.result, isWidthLarger: true },
          ]);
        else
          setImgFile((prev: IImgData[]) => [
            ...prev,
            { content: reader.result, isWidthLarger: false },
          ]);
      };
    };
  };

  const removeImg = (file: string) => {
    setImgFile((prev: IImgData[]) => {
      const newArr = [...prev];
      const oldItemIdx = [...prev].findIndex((i) => i.content === file);
      console.log(oldItemIdx);
      newArr.splice(oldItemIdx, 1);
      return newArr;
    });
  };

  return (
    <Wrap>
      <BreadCrumb
        data={[
          {
            title: "HOME",
            link: "/",
          },
          {
            title: "여행후기",
            link: "/review",
          },
          {
            title: "여행후기 작성",
            link: "/reveiw/write",
          },
        ]}
      />

      <Head>
        <h1>여행후기</h1>
        <div>
          <button>취소하기</button>
          <button type="submit">등록하기</button>
        </div>
      </Head>

      <UserInfo>
        <strong>이영지</strong>
        <input type="password" placeholder="비밀번호를 입력하세요" />
      </UserInfo>

      <ProductInfo>
        <h2>구매한 상품 패키지</h2>
        <ProductInfosCard />
      </ProductInfo>

      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          // formData 로 하면 원하는대로 안됨 그냥 state 로 해주고 onvalid 에 보내주기
          // const formData = new FormData(e.currentTarget);
          // let entries = formData.entries();
          // for (const pair of entries) {
          //   console.log(pair);
          //   // setAnswer((prev: any) => [...prev, String(pair[0])]);
          // }
        }}
      >
        <input type="text" placeholder="제목을 입력하세요" />
        <Rating>
          <strong>별점</strong>
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiOutlineStar size={20} />
          <span>4.3점</span>
        </Rating>
        <textarea placeholder="후기를 남겨주세요!"></textarea>
        <label htmlFor="add-img">
          <input
            type="file"
            accept="image/*"
            id="add-img"
            name="imgfile"
            onChange={saveImgFile}
          />
          <span>사진 첨부하기</span>
        </label>
        {/* 사진 첨부하기 */}
        <button type="submit">등록하기</button>
      </Form>

      <UpdateImg>
        {imgFile &&
          imgFile.map(({ content, isWidthLarger }: IImgData, index: number) => (
            <Img key={index} isWidthLarger={isWidthLarger}>
              <img src={content} alt="프로필 이미지" />
              <button onClick={() => removeImg(content)}>삭제</button>
            </Img>
          ))}
      </UpdateImg>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  margin: 50px auto;
  padding: 0 10px;
  box-sizing: border-box;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  button {
    margin-left: 20px;
    padding: 15px 35px;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: transparent;
    border-radius: 8px;
    cursor: pointer;
    :first-child {
      border: 2px solid #848484;
      color: #848484;
    }
    :last-child {
      color: white;
      border: 2px solid #0d99ff;
      background-color: #0d99ff;
      @media screen and (max-width: 850px) {
        position: fixed;
        bottom: 80px;
        left: 0;
        width: 100%;
        margin-left: 0;
        border-radius: 0;
        font-size: 20px;
        z-index: 10;
      }
    }
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 38px;
  strong {
    font-size: 20px;
    font-weight: bold;
  }
  input {
    width: 50%;
    padding: 15px;
    border: none;
    border-bottom: 1px solid #636366;
    outline: none;
    font-size: 18px;
    ::placeholder {
      font-size: 18px;
    }
  }
`;
const ProductInfo = styled.div`
  margin-top: 50px;
  h2 {
    margin-bottom: 23px;
    font-size: 25px;
    font-weight: bold;
  }
`;
const Form = styled.form`
  margin-top: 50px;
  input[type="text"] {
    width: 100%;
    padding: 15px 0;
    border: none;
    outline: none;
    border-bottom: 1px solid #636366;
    font-size: 25px;
    font-weight: bold;
    ::placeholder {
      color: #48484a;
    }
  }
  textarea {
    display: block;
    width: 100%;
    height: 300px;
    padding: 40px;
    box-sizing: border-box;
    overflow: hidden;
    resize: none;
    border: none;
    outline: none;
    font-size: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  label {
    input[type="file"] {
      display: none;
    }
    span {
      display: inline-block;
      margin-top: 50px;
      width: 100%;
      padding: 16px 0;
      font-size: 20px;
      border: 1px solid #0d99ff;
      border-radius: 8px;
      background-color: white;
      text-align: center;
      color: #0d99ff;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
const Rating = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  strong {
    margin-right: 60px;
    font-size: 22px;
    font-weight: bold;
  }
  svg {
    margin-right: 10px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: #48484a;
  }
`;
const UpdateImg = styled.div`
  margin-top: 50px;
  padding-bottom: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  @media screen and (max-width: 850px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Img = styled.div<{ isWidthLarger: boolean }>`
  width: 100%;
  height: calc(100vw / 5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  @media screen and (max-width: 850px) {
    height: calc(100vw / 4);
  }
  :hover button {
    opacity: 1;
  }
  img {
    width: ${({ isWidthLarger }) => (isWidthLarger ? "" : "100%")};
    height: ${({ isWidthLarger }) => (isWidthLarger ? "100%" : "")};
  }
  button {
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 8px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: url("/public/review_write_icon.svg") no-repeat center;
    background-color: white;
    transition: 0.2s;
    font-size: 0;
    border: none;
    cursor: pointer;
    opacity: 0;
  }
`;

export default ReviewWrite;
