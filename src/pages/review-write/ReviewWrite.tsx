import React, { useState, useRef } from "react";
import BreadCrumb from "../../commons/Breadcrumb";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ProductInfosCard from "./../../commons/ProductInfosCard";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { postReviewDetail } from "../../apis/request";

const ReviewWrite = () => {
  const [imgFile, setImgFile] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      setImgFile((prev: string[]) => [...prev, reader.result]);
    };
  };

  const removeImg = (file: string) => {
    setImgFile((prev: string[]) => {
      const newArr = [...prev];
      newArr.splice(newArr.indexOf(file), 1);
      return newArr;
    });
  };

  const onValid = async (data: any) => {
    console.log(data);
    const formData = new FormData();

    formData.append(
      "productId",
      new Blob([JSON.stringify(19)], {
        type: "application/json",
      }),
    );

    formData.append(
      "reservationId",
      new Blob([JSON.stringify(1)], {
        type: "application/json",
      }),
    );

    formData.append(
      "reviewTitle",
      new Blob([JSON.stringify(data.title)], {
        type: "application/json",
      }),
    );

    formData.append(
      "name",
      new Blob([JSON.stringify("이영지")], {
        type: "application/json",
      }),
    );

    formData.append(
      "password",
      new Blob([JSON.stringify(data.password)], {
        type: "application/json",
      }),
    );

    formData.append(
      "grade",
      new Blob([JSON.stringify(4.0)], {
        type: "application/json",
      }),
    );

    formData.append(
      "text",
      new Blob([JSON.stringify(data.content)], {
        type: "text/plain",
      }),
    );

    for (const img of imgFile) {
      formData.append("image", img);
    }

    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[1]);
      // setAnswer((prev: any) => [...prev, String(pair[0])]);
    }

    await postReviewDetail(formData);

    // 민정님 코드
    // formData.append(
    //   "productPostRequestDTO",
    //   new Blob([JSON.stringify(productPostRequestDTO)], {
    //     type: "application/json",
    //   }),
    // );
    // formData.append("thumbnail", thumbnail[0]);
    // const imageArray = (files: any) => {
    //   for (let i = 0; i < files.length; i += 1) {
    //     formData.append("images", files[i]);
    //   }
    // };

    // if (data.password) formData.append("password", data.password);
    // if (data.password) formData.append("password", data.password);
  };

  const onInValid = (data: any) => {
    console.log(data);
  };

  return (
    <Wrap onSubmit={handleSubmit(onValid, onInValid)}>
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
        <input
          {...register("password", { required: "비밀번호를 입력해주세요" })}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </UserInfo>

      <ProductInfo>
        <h2>구매한 상품 패키지</h2>
        {/* <ProductInfosCard /> */}
      </ProductInfo>

      <Form>
        <input
          {...register("title", { required: "제목을 입력해주세요" })}
          type="text"
          placeholder="제목을 입력하세요"
        />
        <Rating>
          <strong>별점</strong>
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiFillStar size={20} />
          <AiOutlineStar size={20} />
          <span>4.3점</span>
        </Rating>
        <textarea
          {...register("content", { required: "후기를 입력해주세요" })}
          placeholder="후기를 남겨주세요!"
        ></textarea>
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
        {/* <button>등록하기</button> */}
      </Form>

      <UpdateImg>
        {imgFile &&
          imgFile.map((img: string, index: number) => (
            <Img
              key={index}
              style={{ background: `url(${img}) no-repeat center / cover` }}
            >
              <button onClick={() => removeImg(img)}>삭제</button>
            </Img>
          ))}
      </UpdateImg>
    </Wrap>
  );
};

const Wrap = styled.form`
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
const Form = styled.div`
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
const Img = styled.div`
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
