import React from 'react'

import * as S from './styles'
import SegmentDisplay from '../SegmentDisplay'

type Props = {
  current: number
}

const Score = ({ current }: Props) => (
  <S.MainContainer>
    <SegmentDisplay number={current} places={3} />
  </S.MainContainer>
)

export default Score
