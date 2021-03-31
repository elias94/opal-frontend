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

export const EyeIcon = styled(IconButton)`
  & > svg {
    height: 16px;
  }

  &:hover {
    background: none;
    color: ${props => props.theme.colors.gray['800']};
  }
`

export const TextPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  flex: 1;

  width: 70%;
`

export const ResourceImage = styled.div`
  flex: .2;
  min-width: 170px;
  height: 110px;
  background-size: cover,auto;
  background-position: 50% 50%, 50% 50%;
  opacity: 1;//.75;
  border-radius: 6px;
  margin-left: 20px;
  border: 1px solid ${props => props.theme.colors.gray['100']};

  cursor: pointer;
`

export const ResourceCard = styled.div`
  box-shadow: ${props => props.theme.boxShadow.card};
  border-radius: ${props => props.theme.borderRadius.lg};

  width: 100%;
  min-height: 230px;
  margin-bottom: 15px;

  background: #FFF;
`

export const ResourceTitle = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['2xl'][0]};
  line-height: ${props => props.theme.fontSize['2xl'][1].lineHeight};
  font-weight: 600;
  letter-spacing: -.02em;
  color: ${props => props.theme.colors.gray['900']};

  cursor: pointer;

  display: block;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  max-width: 80%;
`

export const ResourceSubtitle = styled(ResourceTitle)`
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  color: ${props => props.theme.colors.gray['400']};
  font-weight: 500;
  letter-spacing: 0;

  margin-left: 10px;
`

export const ResourceHeader = styled.div`
  width: 100%;
`

export const ResourceHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: start;

  width: 100%;
`

export const ResourcePreview = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  max-height: 3rem;
  margin-top: 5px;
`

export const DateInfo = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.gray['400']};

  font-weight: 300;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`

export const ResourceIcon = styled(IconButton)`
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.gray['400']};

  opacity: 0;
  transition: opacity .2s ease-in-out;

  padding: 0;

  &:hover {
    background: none;
    color: ${props => props.theme.colors.gray['800']};
  }

  margin-left: 5px;
  margin-right: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;

  & > svg {
    height: 16px;
  }
`

export const Sep = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.gray['400']};

  margin: 0 5px;
  opacity: 0;
  transition: opacity .2s ease-in-out;
`

export const ResourcePrivate = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.gray['400']};

  border-radius: 6px;

  opacity: 0;
  transition: opacity .2s ease-in-out;

  margin: 0;
  margin-left: 3px;

  cursor: pointer;

  & > div {
    padding: 0 4px;
  }

  & svg {
    height: 18px;
  }

  &:hover {
    color: ${props => props.theme.colors.gray['800']};
  }

  ${props => props.private && css`
    opacity: 1;
  `}
`

export const ResourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0px;
  }

  position: relative;

  &:hover {
    ${ResourceIcon}, ${Sep}, ${ResourcePrivate} {
      opacity: 1;
    }
  }
`
