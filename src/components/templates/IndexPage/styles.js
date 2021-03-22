import styled, { css } from 'styled-components'

import {default as Twitter} from 'components/atoms/TwitterIcon'


export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  background: #f8f2e3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const Main = styled.main`
  flex-grow: 1;
  padding-top: 10rem;

  padding-left: 1.5rem;
  padding-right: 1.5rem;

  max-width: 72rem;

  margin-left: auto;
  margin-right: auto;
`

export const HeaderContainer = styled.div`
  width: 72rem;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 1.5rem;
  padding-right: 1.5rem;

  box-sizing: border-box;
`

export const Header = styled.div`
  height: 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};
`

export const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderMenu = styled.ul`
`

export const HeaderMenuItem = styled.li`
  list-style: none;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['lg'][0]};
  line-height: ${props => props.theme.fontSize['lg'][1].lineHeight};
  font-weight: 500;
  letter-spacing: -.025em;

  border-radius: 6px;
  padding: 10px 15px;
  cursor: pointer;


  &:hover {
    & > a {
      text-decoration: underline;
    }
  }

  & > a {
    text-decoration: none;
    color: ${props => props.theme.colors.gray['700']};
  }
`

export const HeaderMenuItemBig = styled(HeaderMenuItem)`
  background: ${props => props.theme.colors.gray['800']};

  margin-left: 20px;

  &:hover {
    background: ${props => props.theme.colors.gray['900']};

    & > a {
      text-decoration: none;
    }
  }

  & > a {
    color: ${props => props.theme.colors.white};
  }
`

export const Section = styled.section`
`

export const MainTitle = styled.h1`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['8xl'][0]};
  line-height: ${props => props.theme.fontSize['8xl'][1].lineHeight};
  color: ${props => props.theme.colors.gray['900']};

  font-weight: 900;
  letter-spacing: -.025em;

  span {
    background: linear-gradient(to right, #f06844 0%, #ee4c54 25%, #d45e95 50%, #9c6ca6 75%, #6583c1 100%);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const SectionContent = styled.div`
  margin-top: 9rem;
`

export const MainList = styled.ul``

export const MainListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 20px 0;

  &::before {
    content: " ";
    background: ${props => props.theme.colors.gray['900']};
    padding: 4px;
    border-radius: 50%;
    margin: 0 10px;
  }
`

export const MainListText = styled.span`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['3xl'][0]};
  line-height: ${props => props.theme.fontSize['3xl'][1].lineHeight};
  color: ${props => props.theme.colors.gray['900']};

  font-weight: 600;
  letter-spacing: -.025em;
`

export const Footer = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.gray['900']};
  font-weight: 500;

  width: 100%;
  height: 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  text-align: center;

  & > span {
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > a {
      color: ${props => props.theme.colors.blue['500']};
      text-decoration: none;
    }
  }
`

export const TwitterIcon = styled(Twitter)`
  margin-left: 5px;
  
  cursor: pointer;
`
