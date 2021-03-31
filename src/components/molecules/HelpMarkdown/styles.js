import styled from 'styled-components'

import IconButton from 'components/atoms/IconButton'
import {
  Code, Image, Blockquote,
} from 'components/molecules/Block/styles'

export const Container = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;

  z-index: 5;

  border-radius: 50%;
  box-shadow: ${props => props.theme.boxShadow['sm']};
  border: 1px solid ${props => props.theme.colors.blueGray['200']};

  padding: 7px 2px;
`

export const HelpIcon = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};

  font-size: 14px;
`

export const HelpContainer = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;

  width: 16rem;

  z-index: 5;

  border-radius: 6px;

  background: ${props => props.theme.colors.white};

  box-shadow: ${props => props.theme.boxShadow['sm']};
  border: 1px solid ${props => props.theme.colors.blueGray['200']};

  padding: 10px;
`

export const IconButtonEl = styled(IconButton)`
  display: inline-block;
  color: ${props => props.theme.colors.blueGray['300']};
  font-size: 14px;

  &:hover {
    background: ${props => props.theme.colors.blueGray['100']};
  }
`

export const HelpHeader = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 500;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3px;
`

export const HelpContent = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  height: 100%;
  max-height: 18rem;
`

export const LinkEl = styled.span`
  font-weight: 600;
  text-decoration: underline;
`

export const CodeEl = styled(Code)``

export const ImageEl = styled(Image)`
  width: 2rem;
  margin: 0;
`

export const BlockquoteEl = styled(Blockquote)`
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1.5;

  padding-right: 0;
  margin: 0;
`

