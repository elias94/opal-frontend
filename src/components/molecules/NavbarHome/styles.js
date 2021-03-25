import styled from 'styled-components'

import SVG from 'components/atoms/SVG'
import Input from 'components/atoms/Input'
import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  height: 57px;
  background: #FFF;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3;

  box-shadow: ${props => props.theme.boxShadow.card};
  border-bottom: 1px solid ${props => props.theme.colors.gray['200']};
`

export const SVGPlus = styled(SVG)`
  border-radius: 50%;
  height: 20px;
  width: 20px;

  background: ${props => props.theme.colors.gray['800']};
  color: #FFF;

  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    height: 20px;
    fill: ${props => props.theme.colors.white};
  }
`

export const SVGSearch = styled(SVG)`
  padding: 0 10px;
  padding-top: 0px;

  & > svg {
    height: 20px;
    fill: ${props => props.theme.colors.gray['400']};
  }
`

export const SearchInput = styled(Input)`
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0 0px 4px 7.5px;

  color: ${props => props.theme.colors.gray['800']};

  font-weight: 400;
  font-size: ${props => props.theme.fontSize['xl'][0]};

  width: 40rem;

  &::placeholder {
    color: ${props => props.theme.colors.gray['300']};
    font-size: ${props => props.theme.fontSize['lg'][0]};
    vertical-align: center;
    line-height: 1.6rem;
  }
`

export const TagElement = styled.span`
  background: ${props => props.theme.colors.blueGray['200']};
  border-radius: 20px;
  padding: 5px 12.5px;

  margin-right: 5px;

  &:last-of-type {
    margin: 0;
  }

  display: inline-flex;
  position: relative;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const TagName = styled.span`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1;
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 400;
  margin-left: 1px;
`

export const RemoveTag = styled(IconButton)`
  background: ${props => props.theme.colors.blueGray['300']};
  color: ${props => props.theme.colors.blueGray['400']};

  border-radius: 50%;
  font-size: 12px;
  display: inline-flex;

  margin-left: 8px;
  min-height: 18px;
  min-width: 18px;

  padding: 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: border .15s ease-in-out, background .15s ease-in-out;

  &:hover {
    color: ${props => props.theme.colors.blueGray['700']};
    background: ${props => props.theme.colors.blueGray['300']};
  }
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;

  border-bottom: 1px solid ${props => props.theme.colors.gray['200']};
`

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
  height: 100%;
`

export const UserTitle = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  color: 1px solid ${props => props.theme.colors.gray['800']};

  font-weight: 500;
  user-select: none;

  margin-left: 10px;
`

export const UserLogo = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  font-weight: 500;

  width: 36px;
  height: 36px;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.blueGray['500']};

  border-radius: 50%;
  text-transform: uppercase;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const LeftContainer = styled.div`
`

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const RightContainer = styled.div`
  height: 100%;
`
