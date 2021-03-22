import styled from 'styled-components'

import { Dialog as DialogBase } from '@reach/dialog'
import Button from 'components/atoms/Button'

export const Dialog = styled(DialogBase)`
  width: 35vw;
  border-radius: 6px;
  box-shadow: ${props => props.theme.boxShadow['card']};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};
  text-align: center;

  &>img {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const DialogButton = styled(Button)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  padding: 10px 20px;
  border-radius: 6px;

  margin: 0;
  margin-left: 20px;
  margin-top: 30px;
`
