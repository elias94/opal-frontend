import styled, { css } from 'styled-components'

import Button from 'components/atoms/Button'
import {default as IconBase} from 'components/atoms/Icon'
import { Dialog as DialogBase } from '@reach/dialog'
import Input from 'components/atoms/Input'
import IconButton from 'components/atoms/IconButton'

export const Icon = styled(IconBase)``

export const Container = styled.div`
`

export const OpenContainer = styled.div`
  cursor: pointer;
`

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

export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-top: 16px;

  width: 100%;
`

export const InputTextArea = styled.textarea`
  width: 100%;
  height: 8rem;

  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;

  color: ${props => props.color || 'inerith'};
  border: 1px solid ${props => props.theme.colors.coolGray['300']};
  
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #FFF;
  filter: none;

  &:focus, &:active {
      outline: none;
  }
`

export const ConfirmButton = styled(Button)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  padding: 10px 20px;
  border-radius: 6px;

  margin: 0;

  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.blueGray['900']};
  }

  ${props => props.small && css`
    width: 8rem;
  `}
`

export const DialogHeader = styled.div`
  height: 2rem;

  width: 100%;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['800']};

  font-weight: 600;

  letter-spacing: -.02em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${props => props.end && css`
    justify-content: end;
  `}
`

export const IconButtonEl = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['300']};

  &:hover {
    background: ${props => props.theme.colors.blueGray['100']};
  }
`
