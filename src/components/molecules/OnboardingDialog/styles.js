import styled from 'styled-components'

import IconButton from 'components/atoms/IconButton'
import { Dialog as DialogBase } from '@reach/dialog'

export const Dialog = styled(DialogBase)`
  width: 30vw;
  border-radius: 6px;
  box-shadow: ${props => props.theme.boxShadow['card']};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`

export const IconButtonEl = styled(IconButton)`
  color: ${props => props.theme.colors.gray['300']};

  &:hover {
    background: ${props => props.theme.colors.gray['100']};
  }
`
