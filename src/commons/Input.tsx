import styled from "styled-components";

export const BasicInput = styled.input<{
  isDeskTop: boolean;
}>`
  width: ${(props) => (props.isDeskTop ? "700px" : "248px")};
  height: ${(props) => (props.isDeskTop ? "50px" : "48px")};
  border: 1px solid #636366;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: ${(props) => (props.isDeskTop ? "23px" : "16px")};
  color: #8e8e93;
  outline: none;
  padding: 16px 25px;
`;
