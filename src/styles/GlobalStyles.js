import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Colors from './Colors';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    margin: 0;
  }
  body {
    font-family: 'Noto Sans CJK KR', Roboto;
    // color : '${Colors.Black}';
    width: 100vw;
    min-width: 1440px; // 1440 확인 필요
    height: 100vh;
    background-color: '${Colors.White}';
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  button,
  input,
  textarea {
    font-family: 'Noto Sans CJK KR', Roboto;
  }
  button:focus,
  button:active,
  input:focus,
  input:active,
  textarea:focus,
  textarea:active {
    outline: none;
    box-shadow: none;
  }
  ul,
  ol,
  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
`;

export default GlobalStyle;