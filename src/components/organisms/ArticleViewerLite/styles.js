import styled from 'styled-components'

import Title from 'components/atoms/Title'
import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;

  min-width: 625px;

  border-right: 1px solid ${props => props.theme.colors.articleBorderRight};
`

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ArticleContent = styled.div`
  max-width: 660px;

  margin: 10rem 0;

  padding: 32px;
`

export const TitleStyled = styled(Title)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['5xl'][0]};
  line-height: 3.75rem;

  margin: 0;
`

export const Source = styled.h4`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.gray['400']};
  font-weight: 500;
  
  margin-top: 25px;

  cursor: pointer;

  & > a {
    font-family: ${props => props.theme.fontFamily.sans};
    font-size: ${props => props.theme.fontSize['base'][0]};
    line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
    color: ${props => props.theme.colors.gray['400']};
    font-weight: 500;
  }
`

export const ArticleHeader = styled.div`
  margin-bottom: 3rem;
`

export const HighlightPopoverContainer = styled.div`
  position: absolute;
  top: ${props => props.top ? props.top : 0}px;
  left:${props => props.left ? props.left : 0}px;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['5xl'][0]};

  padding: 10px;
  border-radius: 4px;
  background: ${props => props.theme.colors.gray['800']};
  
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const IconPopover = styled(IconButton)`
font-size: 16px;
  color: ${props => props.theme.colors.white};

  &:hover {
    background: none;
  }
`

export const PopoverSeparator = styled.div`
  padding: 8px .8px;
  margin: 0 3px;

  background: ${props => props.theme.colors.gray['200']};
`
