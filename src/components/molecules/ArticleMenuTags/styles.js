import styled from 'styled-components'

import IconButton from 'components/atoms/IconButton'
import Input from 'components/atoms/Input'

export const Container = styled.div`
  margin-top: 5px;
`

export const TagElement = styled.span`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['sm']};

  border-radius: 20px;
  padding: 5px 12.5px;

  margin: 3px 0;
  margin-right: 10px;

  &::last-child {
    margin: 0;
  }

  display: inline-flex;
  position: relative;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: 1;

  color: ${props => props.theme.colors.blueGray['500']};
  padding-left: 14px;
`

export const TagName = styled.span`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: 1;
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 400;
  margin-left: 1px;
`

export const TagsEmpty = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1;
  color: ${props => props.theme.colors.blueGray['400']};
  font-weight: 500;
  margin-left: 5px;

  width: 100%;
  text-align: center;
  height: 1rem;
`

export const RemoveTag = styled(IconButton)`
  background: ${props => props.theme.colors.blueGray['200']};
  color: ${props => props.theme.colors.blueGray['400']};

  border-radius: 50%;
  font-size: 11px;
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

export const TagBottomContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1;
  color: ${props => props.theme.colors.blueGray['400']};
`

export const EditableTagContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['sm']};
  
  color: ${props => props.theme.colors.blueGray['500']};
  font-size: ${props => props.theme.fontSize['base'][0]};

  border-radius: 20px;
  padding: 4.5px 14px;
  
  margin-top: 5px;
  margin-right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const EditableTag = styled(Input)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1;
  color: ${props => props.theme.colors.blueGray['500']};

  width: 100%;
  box-sizing: border-box;
  width: 6vw;

  height: 10px;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.blueGray['300']};
  background: none;
  border-radius: 0;
  margin: 0;
  padding: 9px 0;

  margin-left: 3px;

  &::before {
    content: "#";
    font-family: ${props => props.theme.fontFamily.sans};
    font-size: ${props => props.theme.fontSize['sm'][0]};
    line-height: 1;
    color: ${props => props.theme.colors.blueGray['400']};
  }
`

export const EditableTagButton = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: 1;
  background: ${props => props.theme.colors.blueGray['300']};
  color: ${props => props.theme.colors.blueGray['400']};

  border-radius: 20px;
  padding: 4px 12.5px;
`
