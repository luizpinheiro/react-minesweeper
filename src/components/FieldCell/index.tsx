import React, { useState } from 'react'

import * as S from './styles'
import bombImage from './bomb.png'
import flagImage from './flag.png'
import questionImage from './question.png'

type Props = {
  value: number
  visible: boolean
  flagged: boolean
  doubt: boolean
  onReveal: () => void
  onBombToggle: () => void
  onPressStart: () => void
  onPressEnd: () => void
}

const FieldCell = ({
  value,
  visible,
  flagged,
  doubt,
  onReveal,
  onBombToggle,
  onPressStart,
  onPressEnd,
}: Props) => {
  const [pressed, setPressed] = useState(false)

  const handlePressStart = () => {
    setPressed(true)
    onPressStart()
  }
  const handlePressEnd = () => {
    setPressed(false)
    onPressEnd()
  }

  const handleContextMenu = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    onBombToggle()
  }

  return (
    <S.Cell
      disabled={visible}
      pressed={pressed}
      visible={visible}
      value={value}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseOut={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      onTouchMove={handlePressEnd}
      onClick={onReveal}
      onContextMenu={handleContextMenu}
    >
      {visible && value > 0 && value}
      <img
        alt=""
        src={bombImage}
        width={18}
        height={18}
        style={{ display: visible && value === -1 ? 'block' : 'none' }}
      />
      <img
        alt=""
        src={flagImage}
        width={18}
        height={18}
        style={{ display: flagged ? 'block' : 'none' }}
      />
      <img
        alt=""
        src={questionImage}
        width={18}
        height={18}
        style={{ display: doubt ? 'block' : 'none' }}
      />
    </S.Cell>
  )
}

export default React.memo(FieldCell)
