import styled, { css } from 'styled-components'

import IconButton from 'components/atoms/IconButton'

export const Icon = styled(IconButton)`
  height: 20px;
  color: ${props => props.theme.colors.gray['300']};
  font-size: 18px;
  border-radius: 6px;
  padding: 0;
  padding-top: .75rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity .25s ease-in, color .15s ease;

  &:hover {
    background: none;
    color: ${props => props.theme.colors.gray['500']};
  }

  user-select: none;
`

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;

  min-width: 25px;

  ${props => props.visible && css`
    ${Icon} {
      opacity: 1;
      visibility: visible;
    }
  `}

  &:hover {
    ${Icon} {
      color: ${props => props.theme.colors.gray['500']};
    }
  }

  user-select: none;
`
