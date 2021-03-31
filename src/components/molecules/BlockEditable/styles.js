import styled, { css } from 'styled-components'

export const BulletContainer = styled.div`
  flex: 0;
  display: inline-flex;
  flex-direction: column;
`

export const Bullet = styled.div`
  padding: 3.5px;
  border-radius: 50%;
  margin: 0;
  margin-right: 10px;
  margin-top: 0.85em;
  transition: background .15s ease-in-out;

  ${props => props.visible && css`
    background: ${props => props.theme.colors.gray['300']};
  `}

  ${props => props.focused && css`
    background: ${props => props.theme.colors.gray['900']};
  `}
`

export const Content = styled.div`
  flex: 1;

  cursor: text;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  margin: .4em 0;
  margin-left: ${props => `calc(-17px + ${props.indent * 2}rem)`};
`

export const EditableElement = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.gray['900']};

  outline: none;

  white-space: pre-wrap;

  margin: .1em 0;
`
