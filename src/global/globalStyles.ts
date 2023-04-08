import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: 'Pretendard-Regular', "Inter", sans-serif;
}

  body {
    margin:0;
    padding:0;
    height:100%;
    font-family: 'Pretendard-Regular', "Inter", sans-serif;
  }

  #root {
    /* Color */
    --color-blue: #0D99FF;
    --color-inputGray: #F5F6F7;
    --color-buttonGray: #D9D9D9;
    --color-grayscale10: #F5F5F5;
    --color-grayscale20: #C6C6C6;
    --color-grayscale30: #AEAEB2;
    --color-grayscale40: #8E8E93;
    --color-grayscale50: #636366;
    --color-grayscale60: #48484A;
    position:relative;
    min-height:100%;
  }


  a{
    color: black;
    text-decoration: none;
  }


  main {
    max-width: 1240px;
    margin: 0 auto 100px;
    position: relative;

    @media (max-width: 850px) {
      padding: 0 20px;
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyles;
