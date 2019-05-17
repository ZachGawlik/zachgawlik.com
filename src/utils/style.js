import { css } from '@emotion/core'

const hoverColor = 'rgba(187, 239, 253, 0.8)'

export const animatedHighlight = css`
  background: linear-gradient(to bottom, ${hoverColor} 0%, ${hoverColor} 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 4px 0px;
  color: #000;
  text-decoration: none;
  border-bottom: 2px solid rgb(187, 239, 253);
  transition: all 0.2s ease-in;

  &:visited {
    color: #000;
  }

  &:hover {
    background-size: 4px 50px;
    border-bottom-color: #1a1a1a;
  }
`

const colors = {
  text: '#191919',
}

export const markdownStyle = css`
  a {
    ${animatedHighlight};
  }

  // Inline code
  summary > code,
  p > code,
  li > code,
  a > code {
    background: #efe;
    color: ${colors.text};
  }
`
