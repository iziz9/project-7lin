import styled from "styled-components";

export const BasicSelect = styled.select`
  & {
    -webkit-appearance: none; /* for chrome */
    -moz-appearance: none; /*for firefox*/
    appearance: none;
  }

  &::-ms-expand {
    display: none; /*for IE10,11*/
  }

  width: 200px;
  min-width: 60px;
  height: 49px;
  border-radius: 8px;
  padding-left: 24px;
  font-size: 23px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: #8e8e93;
  background: url("/select_arrow_down.svg") no-repeat 90% 50%/15px auto;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 560px) {
    font-size: 14px;
    height: 42px;
    padding-left: 8px;
    background: url("/select_arrow_down.svg") no-repeat 85% 50%/11px auto;
  }
`;
