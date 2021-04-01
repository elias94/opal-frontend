import styled, { css } from 'styled-components'

import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 6rem;
  width: 100%;

  @media (min-width: ${props => props.theme.screens.lg}) {
    width: 60rem;
  }
`

export const EmptyList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  color: ${props => props.theme.colors.gray['400']};

  white-space: pre;
  text-align: center;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  width: 100%;

  margin: 20px 0;
`

export const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;
`

export const SectionHeaderIcon = styled(IconButton)`
  height: 12px;
  color: ${props => props.theme.colors.blueGray[400]};
  display: inline-block;
  margin: 0;
  padding: 0 3px;
  margin-right: 10px;
  position: relative;

  &>svg {
    position: absolute;
    top: 0px;
    height: 12px;

    ${props => props.rotated && css`
      transform: rotate(180deg);
    `}
  }

  &:hover {
    background: none;
  }
`

export const SectionTitle = styled.h3`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: -.025em;
  color: ${props => props.link ? props.theme.colors.blueGray[400] : props.theme.colors.blueGray[300]};
  margin-bottom: 5px;

  user-select: none;

  display: flex;
  flex-direction: row;
  align-items: center;

  ${props => props.link && css`
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors.blueGray[600]};
      ${SectionHeaderIcon} {
        color: ${props => props.theme.colors.blueGray[600]};
      }
    }
  `}
`

export const ResourcesContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.white};

  border-radius: 0.375rem;
  border: 1px solid ${props => props.theme.colors.blueGray[100]};
  box-shadow: ${props => props.theme.boxShadow['card']};

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  padding: 30px;

  width: 100%;
  box-sizing: border-box;
`
