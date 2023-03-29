import styled from "styled-components";

export const BasicBtn = styled.button<{
  backgroundColor?: string;
  fontColor?: string;
}>`
  height: 65px;
  width: 100%;
  min-width: 83px;
  border: ${(props) =>
    props.backgroundColor === "#fff" ? "1px solid #9F9F9F" : "none"};
  border-radius: 8px;
  font-size: 23px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.fontColor || "#fff"};
  background-color: ${(props) => props.backgroundColor || "#0D99FF"};
  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 16px;
    height: 48px;
  }
`;
