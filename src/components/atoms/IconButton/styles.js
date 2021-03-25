import styled, { css } from 'styled-components'

import Icon from 'components/atoms/Icon'

export const IconContainer = styled.div`
  padding: 0 7px;
  font-size: 20px;
  border-radius: 3px;
  cursor: pointer;

  color: ${props => props.theme.colors.gray['400']};
`

export const IconEl = styled(Icon)``

export const TooltipElement = styled.div`
  background: ${props => props.theme.colors.blueGray['700']};
  position: absolute;
  border-radius: 8px;
  box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.06);

  color: #FFF;
  text-transform: none;
  letter-spacing: 0;
  white-space: nowrap;

  opacity: 0;
  transition: all 0.3s ease;
  will-change: opacity, transform;
  pointer-events: none;
  z-index: 100;

  padding: 10px;
  transform: ${props => props.tooltipLeft ? 'translateX(-60%)' : 'translateX(-20%)'};

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  ${props => props.visible && css`
    transform: ${props => props.tooltipLeft ? 'translateX(-60%)' : 'translateX(-20%)'} translateY(50%);
    width: auto;
    opacity: 1;
  `}
`
