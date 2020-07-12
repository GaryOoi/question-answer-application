import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    margin: 0;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body > #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  p, label {
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
