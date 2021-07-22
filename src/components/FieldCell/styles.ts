import styled from 'styled-components'

import bombImage from './bomb.png'
import flagImage from './flag.png'
import questionImage from './question.png'

const colorMap = (value: number) => {
  switch (value) {
    case 1:
      return '#0f0fd9'
    case 2:
      return '#0e9620'
    case 3:
      return '#adab32'
    case 4:
      return '#5e381d'
    case 5:
    default:
      return '#941b1b'
  }
}

export const Cell = styled.button<{
  pressed: boolean
  visible: boolean
  value: number
  flagged: boolean
  question: boolean
  bomb: boolean
}>`
  cursor: pointer;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  outline: none;
  ${(props) =>
    !props.visible && !props.pressed
      ? `
    border: 2px solid darkgray;
    border-top-color: #fcfcfc;
    border-left-color: #fcfcfc;
    border-right-color: darkgray;
    border-bottom-color: darkgray;
  `
      : `
      background-color: #dbdbdb;
      border: 1px solid #d0d0d0;
  `}
  font-weight: bold;
  font-size: 18px;
  ${(props) => `color: ${colorMap(props.value)};`}
  ${(props) =>
    props.visible &&
    props.value === -1 &&
    `background-color: #cfc0c1 !important;`}
  
  ${(props) =>
    props.flagged &&
    `
    background-image: url("${flagImage}");
    background-size: 18px 18px;
    background-position: center;
    background-repeat: no-repeat;
  `}

  ${(props) =>
    props.question &&
    `
    background-image: url("${questionImage}");
    background-size: 18px 18px;
    background-position: center;
    background-repeat: no-repeat;
  `}
  ${(props) =>
    props.bomb &&
    `
    background-image: url("${bombImage}");
    background-size: 18px 18px;
    background-position: center;
    background-repeat: no-repeat;
  `}
`
