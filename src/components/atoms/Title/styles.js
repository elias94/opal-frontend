import styled from 'styled-components'


const base = `
  margin-bottom: 1em;
  display: block;

  letter-spacing: -.025em;
`

export const Title = {
  h1: styled.h1`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    line-height: 1;
    font-size: 2.75rem;
    margin-block-start: 2rem;
    margin-block-end: 1rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `,
  h2: styled.h2`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    line-height: 2.5rem;
    font-size: 1.95rem;
    margin-block-start: 1.5rem;
    margin-block-end: .5rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `,
  h3: styled.h3`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    line-height: 2rem;
    font-size: 1.5rem;
    margin-block-start: 1rem;
    margin-block-end: .25rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `,
  h4: styled.h4`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    font-size: 1.15rem;
    margin-block-start: 0.5rem;
    margin-block-end: 0rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `,
  h5: styled.h5`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    font-size: 0.95rem;
    margin-block-start: 0.5rem;
    margin-block-end: 0rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `,
  h6: styled.h6`
    ${base};
    color: ${props => props.theme.colors.textColor};
    text-align: ${props => props.center ? 'center' : 'left'};
    font-size: 0.8rem;
    margin-block-start: 0.5rem;
    margin-block-end: 0rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  `
}
