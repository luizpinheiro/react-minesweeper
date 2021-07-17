import React from 'react'

import * as S from './styles'
import NumberSegment from '../NumberSegment'

type Props = {
  number: number
  places: number
}

const splitNumber = (number: number): number[] =>
  number
    .toString()
    .split('')
    .map((i) => parseInt(i, 10))

const placeholderSegments = (places: number) => {
  const elements = []
  for (let i = 0; i < places; i += 1)
    elements.push(<NumberSegment key={i} number={null} />)
  return elements
}

const SegmentDisplay = ({ number, places }: Props) => {
  const segments: number[] = splitNumber(number)

  return (
    <S.MainContainer>
      {places > segments.length &&
        placeholderSegments(places - segments.length)}
      {segments.map((n, index) => {
        const key = `${index}`
        return <NumberSegment key={key} number={n} />
      })}
    </S.MainContainer>
  )
}

export default SegmentDisplay
