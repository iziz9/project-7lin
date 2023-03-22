import styled from "styled-components";

export const BasicBtn = styled.button<{
  backgroundColor?: string;
  fontColor?: string;
  isDeskTop: boolean;
}>`
  width: ${(props) => (props.isDeskTop ? "700px" : "248px")};
  height: ${(props) => (props.isDeskTop ? "65px" : "48px")};
  border: none;
  border-radius: 8px;
  font-size: ${(props) => (props.isDeskTop ? "23px" : "16px")};
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.fontColor || "#fff"};
  background-color: ${(props) => props.backgroundColor || "#0D99FF"};
  cursor: pointer;
`;
