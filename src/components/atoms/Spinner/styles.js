import styled, { keyframes } from 'styled-components'

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinnerEl = styled.div`
  position: absolute;
  z-index: -1;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-top-color: transparent;
  border-top-color: ${props => props.theme.colors.text};
  border-radius: 50%;
  animation: ${spinner} 1s linear infinite;
`
