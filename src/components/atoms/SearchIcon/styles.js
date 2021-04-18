import styled from 'styled-components'

import SVG from 'components/atoms/SVG'

export const SVGSearch = styled(SVG)`
  padding: 0 10px;
  padding-top: 0px;

  & > svg {
    height: 20px;
    fill: ${props => props.theme.colors.blueGray['400']};
  }
`
