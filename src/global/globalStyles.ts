import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

* {

}

  body {
    margin:0;
    padding:0;
    height:100%;
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


    position:relative;
    min-height:100%;
  }
  a{
    color: black;
    text-decoration: none;
  }


  main {
    max-width: 1240px;
    margin: auto;
    position: relative;
  }
`;

export default GlobalStyles;
