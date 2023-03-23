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
  }
`;

export default GlobalStyles;
