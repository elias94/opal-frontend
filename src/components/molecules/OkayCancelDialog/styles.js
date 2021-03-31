import styled from 'styled-components'

import Button from 'components/atoms/Button'
import {default as IconBase} from 'components/atoms/Icon'
import { Dialog as DialogBase } from '@reach/dialog'
import Input from 'components/atoms/Input'
import IconButton from 'components/atoms/IconButton'

export const Icon = styled(IconBase)``

export const Container = styled.div`
  display: inline-flex;
`

export const ButtonOpen = styled.div`
`

export const Dialog = styled(DialogBase)`
  width: 20vw;
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
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  padding-top: 16px;

  width: 100%;
`

export const InputUrl = styled(Input)`
  width: 100%;
  margin: 0;
`

export const ConfirmButton = styled(Button)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  background: ${props => props.theme.colors.blueGray['800']};

  &:hover {
    background: ${props => props.theme.colors.blueGray['900']};
  }

  padding: 10px 20px;
  border-radius: 6px;

  margin: 30px 0 7.5px 0;

  width: 100%;
`

export const CancelButton = styled(ConfirmButton)`
  color: ${props => props.theme.colors.blueGray['800']};
  background: ${props => props.theme.colors.blueGray['100']};

  margin: 0;

  &:hover {
    background: ${props => props.theme.colors.blueGray['200']};
  }
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
`

export const DialogError = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.red['500']};

  width: 100%;
  margin-top: 20px;
  margin-bottom: 0;
  padding: 10px 15px;
  align-self: start;

  border-radius: 6px;
  text-align: center;
`

export const IconButtonEl = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['300']};

  &:hover {
    background: ${props => props.theme.colors.blueGray['100']};
  }
`
