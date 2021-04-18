import styled from 'styled-components'

import {default as Twitter} from 'components/atoms/TwitterIcon'

export const TwitterIcon = styled(Twitter)`
  margin-left: 5px;

  color: ${props => props.theme.colors.gray['200']};
  
  cursor: pointer;

  svg {
    fill: ${props => props.theme.colors.blueGray['300']};
  }

  &:hover {
    svg {
      fill: ${props => props.theme.colors.blueGray['400']};
    }
  }
`
