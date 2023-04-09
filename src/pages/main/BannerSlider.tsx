import React, { ReactHTMLElement } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import styled from "styled-components";
import { useNavigate } from "react-router";

interface ProductsType {
  productId: number;
  img: string;
  tags: string[];
  title: string;
}

const BannerSlider = () => {
  const navigate = useNavigate();
  const products: ProductsType[] = [
    {
      productId: 12,
      img: "banner-product12.png",
      tags: ["#동아프리카3개국", "#남아프리카5개국"],
      title: "액티브 시니어들만의\n아프리카 8개국 27일",
    },
    {
      productId: 10,
      img: "banner-product10.png",
      tags: ["#대부", "#시네마천국", "#그랑블루"],
      title: "영화를 보신 분들만\n시칠리아 일주 9일",
    },
    {
      productId: 8,
      img: "banner-product8.png",
      tags: ["#링로드일주", "#하이랜드", "#빙하하이킹"],
      title: "5070들만 출발!\n아이슬란드 11일",
    },
    {
      productId: 6,
      img: "banner-product6.png",
      tags: ["#조지아", "#아르메니아", "#아제르바이잔", "#와이너리투어"],
      title: "와인러버들끼리 떠나는\n코카서스 3개국 18일",
    },
  ];

  const PrevArrow = (props: any) => {
    return <GoChevronLeft onClick={props.onClick} className="left-button" />;
  };

  const NextArrow = (props: any) => {
    return <GoChevronRight onClick={props.onClick} className="right-button" />;
  };

  const settings: any = {
    arrow: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToscroll: 1,
    draggable: true,
    dots: true,
    dotsClass: "slick-dots",
    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          color: "var(--color-blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    pauseOnHover: true,
    responsive: [
      {
        // breakpoints: 850,
      },
    ],
  };

  return (
    <SliderDiv>
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product.productId}
            className="container"
            onClick={() => navigate("product/:" + product.productId)}
          >
            <img src={`/${product.img}`} />
            <div className="tags">
              <span>{product.tags[0]}</span>
              <span>{product.tags[1]}</span>
              {product.tags[2] && <span>{product.tags[2]}</span>}
              {product.tags[3] && <span>{product.tags[3]}</span>}
            </div>
            <div className="title">
              <span>{product.title}</span>
            </div>
          </div>
        ))}
      </Slider>
    </SliderDiv>
  );
};

const SliderDiv = styled.div`
  cursor: pointer;
  .container {
    position: relative;
  }

  .tags {
    display: flex;
    gap: 15px;
    position: absolute;
    color: white;
    text-align: center;
    display: flex;
    padding: 10px;
    top: 25%;
    background-color: #86868666;
    right: 50%;
    transform: translateX(50%);
    white-space: pre;
    font-size: 18px;
    border-radius: 8px;
  }

  .title {
    font-size: 55px;
    line-height: 60px;
    position: absolute;
    top: 35%;
    display: flex;
    color: white;
    right: 50%;
    transform: translateX(50%);
    white-space: pre;

    span {
      border-radius: 8px;
      background-color: #0d99ff66;
      padding: 10px 20px;
    }
  }

  img {
    width: 100%;
  }

  .left-button {
    position: absolute;
    align-items: center;
    width: 50px;
    height: 50px;
    top: 50%;
    z-index: 9;
    transform: translateY(-50%);
    color: white;
    cursor: pointer;
  }
  .right-button {
    position: absolute;
    width: 50px;
    height: 50px;
    z-index: 9;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    color: white;
    cursor: pointer;
    transform: translateY;
  }

  .slick-dots ul {
    display: flex;
    gap: 1px;
  }

  .slick-dots li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
  }

  .slick-dots li button::before {
    border: none;
    background-color: var(--color-blue);
    color: transparent;
    cursor: pointer;
    display: block;
    border-radius: 100%;
    padding: 0;
    width: 12px;
    height: 12px;
  }

  .slick-dots li.slick-active button::before {
    background-color: var(--color-blue);
    width: 20px;
    margin-left: -5px;
    border-radius: 60px;
  }
`;

export default BannerSlider;
