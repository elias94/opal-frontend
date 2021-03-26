import styled from 'styled-components'

export const OverlayLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 2;

  background: ${props => props.theme.colors.white};
  opacity: .75;
`
