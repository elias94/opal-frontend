import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {}

  /* CSS RESET */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  html, body, #__next {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  code {
    background: #fafafa;
    /* background: #e4e4e7 */
    border: 1px solid #e4e4e7;
    color: #475569;
    border-radius: 6px;
    padding: 3.5px 8px;
  }

  .highlighter {
    background-color: #FAF089;
  }

  [data-reach-dialog-overlay] {
    z-index: 100;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Inter var', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  html, body, #__next {
    height: auto;
  }

  .color-gradient {
    background: linear-gradient(to right, #f06844 0%, #ee4c54 25%, #d45e95 50%, #9c6ca6 75%, #6583c1 100%);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .background-gradient {
    background: linear-gradient(to right, #f06844 0%, #ee4c54 25%, #d45e95 50%, #9c6ca6 75%, #6583c1 100%);
  }

  .half-button {
    background: linear-gradient(to right, #9c6ca6 0%, #6583c1 100%);

    &:hover {
      background: linear-gradient(to right, #f06844 0%, #ee4c54 100%);
    }
  }
`
