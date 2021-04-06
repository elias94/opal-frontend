import styled, { css } from 'styled-components'

import Title from 'components/atoms/Title'
import Link from 'components/atoms/Link'
import P from 'components/atoms/P'
import {default as InternalBlockBase} from 'components/atoms/InternalBlock'
import {default as TweetBlockBase} from 'components/atoms/TweetBlock'

export const Container = styled.div`
  white-space: pre-wrap;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};

  display: flex;
  flex-direction: row;

  margin-left: ${props => `calc(-37.5px + ${props.indent * 2}rem)`};
`

export const Content = styled.div`
  display: inline-flex;
  width: 100%;
`

export const ContainerEditable = styled.div`
  white-space: pre-wrap;

  margin: .1em 0;
  min-height: 1rem;
`

export const Paragraph = styled(P)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};

  margin: 0.575em 0;

  ${props => props.editable && css`
    font-family: ${props => props.theme.fontFamily.sans};
    font-size: ${props => props.theme.fontSize['base'][0]};
    line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
    margin: 0;

    -webkit-tap-highlight-color: 'transparent';
    &:empty:before {
      content: attr(data-placeholder);
      color: #cbcbcb;
      display: inline-block;
    }
  `}
`

export const Image = styled.img`
  width: 100%;
  border-radius: 6px;

  margin: 1rem 0;
`

export const Code = styled.code`
  font-family: ${props => props.theme.fontFamily.mono};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  font-size: .92rem;
`

export const Blockquote = styled.blockquote`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['2xl'][0]};
  line-height: ${props => props.theme.fontSize['2xl'][1].lineHeight};

  color: ${props => props.theme.colors.gray[500]};
  border-left: 3px solid ${props => props.theme.colors.gray[300]};

  white-space: pre-wrap;
  word-break: break-word;
  padding-left: 0.9em;
  padding-right: 0.9em;
  font-size: 1.2em;
  margin-top: 4px;
  margin-bottom: 4px;

  ${props => props.editable && css`
    -webkit-tap-highlight-color: 'transparent';
    &:empty:before {
      content: attr(data-placeholder);
      color: #cbcbcb;
      display: inline-block;
    }
  `}
`

export const LinkStyled = styled(Link)`
  transition: border-bottom .15s ease;

  &:hover {
    text-decoration: underline;
  }
`

export const TitleStyled = styled(Title)`
  font-family: ${props => props.theme.fontFamily.sans};
  position: relative;

  ${props => props.editable && css`
    -webkit-tap-highlight-color: 'transparent';
    font-weight: 600;
    line-height: 1;

    ${props => props.level === 'h1' && css`
      font-size: 1.5rem;
      line-height: 1.4;
      margin-block-start: .5rem;
      margin-block-end: .5rem;
    `}

    ${props => props.level === 'h2' && css`
      font-size: 1.4rem;
      line-height: 1.3;
      margin-block-start: .5rem;
      margin-block-end: .5rem;
    `}

    ${props => props.level === 'h3' && css`
      font-size: 1.3rem;
      line-height: 1.3;
      margin-block-start: .5rem;
      margin-block-end: .5rem;
    `}

    /* Header level info on the left */
    &::before {
      content: attr(data-level);
      position: absolute;
      top: 0;
      left: -27.5px;
      margin: 0;
      height: auto;

      font-size: 1rem;
      font-weight: 500;
      color: ${props => props.theme.colors.gray[400]};
      /* text-transform: capitalize; */
      opacity: .75;

      display: inline;
      vertical-align: baseline;

      &::first-letter {
        initial-letter: 2;
      }

      ${props => props.level === 'h1' && css`
        top: 9px;
      `}

      ${props => props.level === 'h2' && css`
        top: 7px;
      `}

      ${props => props.level === 'h3' && css`
        top: 5px;
      `}
    }

    &:empty:before {
      content: attr(data-placeholder);
      color: #cbcbcb;
      display: inline-block;
    }
  `}
`

export const InternalHighlight = styled.div`
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['card']};

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  padding: 20px;

  margin: 1.5rem 0;

  ${props => props.editable && css`
    margin: 0;

    padding: 20px;
  `}
`

export const InternalBlock = styled(InternalBlockBase)`
  margin: 1rem 0;

  ${props => props.editable && css`
    margin: 0;

    padding: 20px;
  `}
`

export const TweetBlock = styled(TweetBlockBase)`
  flex: 1;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  padding-left: 2px;
  color: inherit;
  fill: inherit;
`

export const ListDecorationElement = styled.div`
  margin-right: 2px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: calc(1.5em);
`

export const ListDecorationContent = styled.div`
  font-size: ${props => (props.order ? '16px' : '1.2em')};
  line-height: 0;
  margin-bottom: 0.1em;
  cursor: ${props => props.hasChildren ? 'pointer' : 'default'};
  user-select: none;
  color: ${props => props.theme.colors.active};
`

export const ListContent = styled.div`
  flex: 1 1 0px;
  min-width: 1px;
  display: flex;
  flex-direction: column;
`
