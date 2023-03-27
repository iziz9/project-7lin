import styled from "styled-components";

export const BasicInput = styled.input`
  height: 50px;
  /* min-width: 248px; */
  width: 100%;
  border: 1px solid #636366;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 23px;
  color: #8e8e93;
  outline: none;
  padding: 16px 25px;

  @media (max-width: 560px) {
    font-size: 16px;
    height: 48px;
  }
`;
