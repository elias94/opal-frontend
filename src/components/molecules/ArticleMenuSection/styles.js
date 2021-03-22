import styled, { css } from 'styled-components'

import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  margin: 15px 0;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Header = styled.div`
`

export const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const RightSection = styled.div`
`

export const SectionTitle = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 500;
  text-transform: capitalize;

  display: inline;

  cursor: pointer;
  user-select: none;
`

export const Caret = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};
  display: inline;

  & > svg {
    transition: transform .25s ease;
    height: 18px;
  }

  ${props => props.open && css`
    & > svg {
      transform: rotate(90deg);
    }
  `};

  &:hover {
    color: ${props => props.theme.colors.blueGray['500']};
    background: none;
  }
`

export const InfoElement = styled.div`
  content: "\\201c";
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: 0.875rem;
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  background: ${props => props.theme.colors.blueGray['200']};
  color: ${props => props.theme.colors.blueGray['500']};

  border-radius: 50%;
  display: inline;

  padding: 2px 8px;
  margin: .5rem;

  cursor: default;
`

export const TooltipElement = styled.div`
  background: ${props => props.theme.colors.blueGray['700']};
  position: absolute;
  border-radius: 8px;
  box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.06);
  max-width: 200px;

  color: #FFF;
  text-transform: none;
  letter-spacing: 0;

  opacity: 0;
  transition: all 0.3s ease;
  will-change: opacity, transform;
  pointer-events: none;

  padding: 10px;
  transform: translateX(-15%) translateY(-10%);

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  ${props => props.visible && css`
    transform: translateX(-15%) translateY(10%);
    width: auto;
    opacity: 1;
  `}
`

export const Content = styled.div`
  transition: height 0.25s ease;

  height: ${props => props.open ? 'auto' : 0};
  overflow: hidden;
`
