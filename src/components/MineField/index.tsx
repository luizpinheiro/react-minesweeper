import React, { useCallback, useEffect, useMemo, useState } from 'react'

import * as S from './styles'
import FieldCell from '../FieldCell'
import { rangeArray } from '../../utils/numbers'
import { GameStatus } from '../../types/enums'

type Props = {
  size: number
  gameStatus: GameStatus
  fieldMap: number[][]
  onScore: () => void
  onBomb: () => void
  onPressStart: () => void
  onPressEnd: () => void
}

enum CellValue {
  'UNREVEALED',
  'REVEALED',
  'FLAG',
  'DOUBT',
}

const revealAllBombs = (
  fieldMap: number[][],
  visibleField: number[][],
): void => {
  fieldMap.forEach((row, y) =>
    row.forEach((v, x) => {
      visibleField[y][x] = CellValue.REVEALED
    }),
  )
}

const MineField = ({
  size,
  fieldMap,
  onScore,
  onBomb,
  onPressStart,
  onPressEnd,
  gameStatus,
}: Props) => {
  const [visibleField, setVisibleField] = useState(() =>
    rangeArray(size).map(() => rangeArray(size)),
  )

  const onBombToggle = useCallback(
    (y: number, x: number) => {
      if (gameStatus === GameStatus.WIN || gameStatus === GameStatus.LOST)
        return

      if (visibleField[y][x] === CellValue.FLAG)
        visibleField[y][x] = CellValue.DOUBT
      else if (visibleField[y][x] === CellValue.DOUBT)
        visibleField[y][x] = CellValue.UNREVEALED
      else visibleField[y][x] = CellValue.FLAG

      setVisibleField([...visibleField.map((i) => [...i])])
    },
    [gameStatus, visibleField],
  )

  const handleReveal = useCallback(
    (y: number, x, updateState = true) => {
      if (gameStatus === GameStatus.WIN || gameStatus === GameStatus.LOST)
        return

      // Check if we are trying to reveal an invalid or already visible position
      if (y < 0 || y >= size || x < 0 || x >= size || visibleField[y][x] > 0)
        return

      visibleField[y][x] = 1
      if (fieldMap[y][x] >= 0) onScore()
      if (fieldMap[y][x] === 0) {
        // try to reveal the NorthWest position
        handleReveal(y - 1, x - 1, false)
        // try to reveal the North oposition
        handleReveal(y, x - 1, false)
        // try to reveal the NorthEast position
        handleReveal(y + 1, x - 1, false)
        // try to reveal the West position
        handleReveal(y - 1, x, false)
        // try to reveal the East position
        handleReveal(y + 1, x, false)
        // Try to reveal the SouthWest position
        handleReveal(y - 1, x + 1, false)
        // Try to reveal the South position
        handleReveal(y, x + 1, false)
        // Try to reveal the SouthEast position
        handleReveal(y + 1, x + 1, false)
      }
      if (fieldMap[y][x] === -1) {
        revealAllBombs(fieldMap, visibleField)
        onBomb()
      }

      if (updateState) setVisibleField([...visibleField.map((i) => [...i])])
    },
    [size, fieldMap, onBomb, onScore, visibleField, gameStatus],
  )

  useEffect(() => {
    setVisibleField(rangeArray(size).map(() => rangeArray(size)))
  }, [fieldMap, size])

  const field: React.ReactFragment[] = useMemo(() => {
    const result: React.ReactFragment[] = []
    fieldMap.forEach((row, y) =>
      row.forEach((value, x) => {
        const k = `${y}-${x}`
        result.push(
          <React.Fragment key={k}>
            {x === 0 && <S.Separator />}
            <FieldCell
              visible={visibleField[y][x] === CellValue.REVEALED}
              flaged={visibleField[y][x] === CellValue.FLAG}
              doubt={visibleField[y][x] === CellValue.DOUBT}
              value={value}
              onReveal={() => handleReveal(y, x)}
              onBombToggle={() => onBombToggle(y, x)}
              onPressStart={onPressStart}
              onPressEnd={onPressEnd}
            />
          </React.Fragment>,
        )
      }),
    )
    return result
  }, [visibleField])

  return <S.MainContainer>{field}</S.MainContainer>
}

export default MineField
