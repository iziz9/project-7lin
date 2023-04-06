import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

type Props = {};

const NotFoundPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="buttonbox">
        <button onClick={() => navigate("/")}>메인페이지로</button>
      </div>
      <div className="image">
        <img src="/notfound.png" alt="Not Found" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  .image {
    width: 100%;
    text-align: center;

    img {
      filter: invert(100%);
    }
  }

  .buttonbox {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      /* background-color: var(--color-blue); */
      background-color: black;
      color: white;
      font-size: 30px;
      margin: 50px auto;
      cursor: pointer;

      :hover {
        background-color: var(--color-grayscale40);
      }
    }
  }

  @media (max-width: 850px) {
    .image {
      img {
        width: 100%;
      }
    }
    .buttonbox {
      button {
        font-size: 20px;
      }
    }
  }
`;

export default NotFoundPage;
