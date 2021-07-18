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

enum CellState {
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
      visibleField[y][x] = CellState.REVEALED
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

      if (visibleField[y][x] === CellState.FLAG)
        visibleField[y][x] = CellState.DOUBT
      else if (visibleField[y][x] === CellState.DOUBT)
        visibleField[y][x] = CellState.UNREVEALED
      else visibleField[y][x] = CellState.FLAG

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

      // If we didn't revealed a bomb we must increase the score
      // or else we reveal all of the bombs and trigger the appropriate callback
      if (fieldMap[y][x] >= 0) {
        onScore()
      } else {
        revealAllBombs(fieldMap, visibleField)
        onBomb()
      }

      // If we don't have any bombs on all of the neighbors then we can safely
      // reveal all of them
      if (fieldMap[y][x] === 0) {
        // try to reveal the NorthWest position
        handleReveal(y - 1, x - 1, false)
        // try to reveal the North position
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
              visible={visibleField[y][x] === CellState.REVEALED}
              flaged={visibleField[y][x] === CellState.FLAG}
              doubt={visibleField[y][x] === CellState.DOUBT}
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
  }, [
    visibleField,
    onPressStart,
    onPressEnd,
    fieldMap,
    handleReveal,
    onBombToggle,
  ])

  return <S.MainContainer>{field}</S.MainContainer>
}

export default MineField
