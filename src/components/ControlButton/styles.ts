import styled from 'styled-components'

export const MainContainer = styled.div``

export const Button = styled.button`
  border-radius: 0;
  border-top-color: #fcfcfc;
  border-left-color: #fcfcfc;
  border-right-color: darkgray;
  border-bottom-color: darkgray;
  cursor: pointer;

  &:focus {
    border-top-color: #fcfcfc;
    border-left-color: #fcfcfc;
    border-right-color: darkgray;
    border-bottom-color: darkgray;
  }
  &:active {
    border-bottom-color: #fcfcfc;
    border-right-color: #fcfcfc;
    border-left-color: darkgray;
    border-top-color: darkgray;
  }
`
