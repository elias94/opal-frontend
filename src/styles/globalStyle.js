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

    height: 100vh;
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
`
