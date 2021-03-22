import styled, { keyframes } from 'styled-components'

import {default as ReachTooltip} from '@reach/tooltip'

import '@reach/tooltip/styles.css'

const Tooltip = styled(ReachTooltip)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.gray['800']};

  z-index: 99;
  position: absolute;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;

  max-width: 250px;

  overflow-wrap: break-word;
  word-break: keep-all;
  white-space: pre-wrap;
`

export default Tooltip
