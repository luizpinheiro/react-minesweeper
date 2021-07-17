import React from 'react'

import * as S from './styles'

type Props = {
  number: number | null
}

const hasBorder = (
  number: number | null,
  sector: string,
  borderPosition: 'left' | 'top' | 'bottom' | 'right',
) => {
  switch (number) {
    case 0:
      if (sector === 'upper' && borderPosition === 'bottom') return false
      if (sector === 'lower' && borderPosition === 'top') return false
      return true
    case 1:
      return borderPosition === 'right'
    case 2:
      if (sector === 'upper' && borderPosition === 'left') return false
      if (sector === 'lower' && borderPosition === 'right') return false
      return true
    case 3:
      return borderPosition !== 'left'
    case 4:
      if (sector === 'upper' && borderPosition === 'top') return false
      if (sector === 'lower' && borderPosition === 'left') return false
      if (sector === 'lower' && borderPosition === 'bottom') return false
      return true
    case 5:
      if (sector === 'upper' && borderPosition === 'right') return false
      if (sector === 'lower' && borderPosition === 'left') return false
      return true
    case 6:
      if (sector === 'upper' && borderPosition === 'right') return false
      return true
    case 7:
      if (sector === 'upper' && borderPosition === 'top') return true
      return borderPosition === 'right'
    case 8:
      return true
    case 9:
      if (sector === 'lower' && borderPosition === 'left') return false
      return true
    default:
      return false
  }
}

const enabledBorder = 'rgba(255,0,0)'
const disabledBorder = 'rgba(255,0,0, .3)'

const NumberSegment = ({ number }: Props) => (
  <S.MainContainer>
    {['upper', 'lower'].map((sector: string) => (
      <S.Sector
        key={sector}
        position={sector as 'upper' | 'lower'}
        style={{
          borderTopColor: hasBorder(number, sector, 'top')
            ? enabledBorder
            : disabledBorder,
          borderRightColor: hasBorder(number, sector, 'right')
            ? enabledBorder
            : disabledBorder,
          borderBottomColor: hasBorder(number, sector, 'bottom')
            ? enabledBorder
            : disabledBorder,
          borderLeftColor: hasBorder(number, sector, 'left')
            ? enabledBorder
            : disabledBorder,
        }}
      />
    ))}
  </S.MainContainer>
)

export default NumberSegment
