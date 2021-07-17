import styled from 'styled-components'

export const MainContainer = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
`

export const Sector = styled.div<{ position: 'upper' | 'lower' }>`
  width: 11px;
  height: 12px;
  border: 2px solid rgba(255, 0, 0, 0.15);
  ${(props) =>
    props.position === 'upper' &&
    `border-bottom: 1px solid rgba(255, 0, 0, 0.15)`}
  ${(props) =>
    props.position === 'lower' && `border-top: 1px solid rgba(255, 0, 0, 0.15)`}
`
