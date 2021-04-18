import styled, { css } from 'styled-components'

import Input from 'components/atoms/Input'
import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  z-index: 2;

  background: ${props => props.theme.colors.blueGray['50']};
  /* transition: width .3s ease-in-out; */
  border-left: 1px solid ${props => props.theme.colors.gray['200']};
  position: absolute;
  right: 0;

  width: 35rem;
  height: calc(100% - 47px);

  ${props => props.hidden && css`
    width: 0;
  `}

  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  position: relative;

  padding: 0 7.5px;

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['sm']};

  border-radius: 20px;
`

export const SearchInput = styled(Input)`
  flex: 1;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 7.5px 0;
  padding-left: 13px;

  transition: text-align 1s ease-in;

  border-radius: 20px;


  color: ${props => props.theme.colors.blueGray['800']};

  font-weight: 400;
  font-size: ${props => props.theme.fontSize['base'][0]};

  &::placeholder {
    color: ${props => props.theme.colors.gray['300']};
    font-size: ${props => props.theme.fontSize['base'][0]};
    vertical-align: center;
  }
`

export const TagElement = styled.span`
  background: ${props => props.theme.colors.blueGray['200']};
  border-radius: 20px;
  padding: 5px 8px;

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
  font-size: 10px;
  display: inline-flex;

  margin-left: 4px;
  min-height: 16px;
  min-width: 16px;

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
