import styled from 'styled-components'

export const MainContainer = styled.div<{ size: number }>`
  display: flex;
  flex-direction: column;
  background: #efefef;
  padding: 10px;
  margin: 10px auto;
  min-width: 0;
  width: ${(props) => props.size * 28 + 8}px;
  border: 2px solid;
  border-top-color: #fcfcfc;
  border-left-color: #fcfcfc;
  border-right-color: darkgray;
  border-bottom-color: darkgray;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 550px) {
    margin: 0 auto 15px;
    box-shadow: 0;
  }
`

export const HeaderContainer = styled.div`
  padding: 5px;
  border: 3px solid;
  border-top-color: darkgray;
  border-left-color: darkgray;
  border-right-color: #fcfcfc;
  border-bottom-color: #fcfcfc;
  margin: 7px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const BodyContainer = styled.div`
  margin: 7px 0;
  padding: 0;
  border: 4px solid;
  border-top-color: darkgray;
  border-left-color: darkgray;
  border-right-color: #fcfcfc;
  border-bottom-color: #fcfcfc;
`

export const SignatureContainer = styled.div`
  font-size: 12px;
  text-align: center;
  font-family: 'Helvetica', sans-serif;

  span {
    color: red;
    font-weight: bold;
  }
`
