import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

* {

}

  body {
   
  }
  #root {
    /* Color */
    --color-blue: #0D99FF;
    --color-inputGray: #F5F6F7;
  }

`;

export default GlobalStyles;
