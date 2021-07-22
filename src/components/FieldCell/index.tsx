import React, { useState } from 'react'

import * as S from './styles'

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
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setPressed(true)
    setTimeoutId(
      window.setTimeout(() => {
        onBombToggle()
        setTimeoutId(null)
      }, 500),
    )
  }
  const handleTouchEnd = () => {
    setPressed(false)
    if (timeoutId) window.clearTimeout(timeoutId)
  }

  return (
    <S.Cell
      disabled={visible}
      pressed={pressed}
      visible={visible}
      bomb={visible && value === -1}
      question={doubt}
      flagged={flagged}
      value={value}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseOut={handlePressEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handlePressEnd}
      onTouchMove={handlePressEnd}
      onClick={onReveal}
      onContextMenu={handleContextMenu}
    >
      {visible && value > 0 && value}
    </S.Cell>
  )
}

export default React.memo(FieldCell)
