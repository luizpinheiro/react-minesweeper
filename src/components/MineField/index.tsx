import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import * as S from './styles'
import FieldCell from '../FieldCell'
import { rangeArray } from '../../utils/numbers'
import { GameStatus } from '../../types/enums'
import { neighborsPositions } from '../../utils/miscellaneous'
import flagSound from './sounds/flagSound.mp3'
import revealSound from './sounds/revealSound.mp3'
import questionSound from './sounds/questionSound.mp3'

type Props = {
  size: number
  gameStatus: GameStatus
  fieldMap: number[][]
  onScore: () => void
  onBomb: () => void
  onPressStart: () => void
  onPressEnd: () => void
  soundEnabled: boolean
}

enum CellState {
  'UNREVEALED',
  'REVEALED',
  'FLAGGED',
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
  soundEnabled,
}: Props) => {
  const flagSoundRef = useRef<HTMLAudioElement>(null)
  const revealSoundRef = useRef<HTMLAudioElement>(null)
  const questionSoundRef = useRef<HTMLAudioElement>(null)
  const [visibleField, setVisibleField] = useState(() =>
    rangeArray(size).map(() => rangeArray(size)),
  )

  const onBombToggle = useCallback(
    (y: number, x: number) => {
      if (gameStatus === GameStatus.WIN || gameStatus === GameStatus.LOST)
        return
      if (visibleField[y][x] === CellState.REVEALED) return

      if (visibleField[y][x] === CellState.FLAGGED) {
        visibleField[y][x] = CellState.DOUBT
        soundEnabled && questionSoundRef.current?.play()
      } else if (visibleField[y][x] === CellState.DOUBT) {
        visibleField[y][x] = CellState.UNREVEALED
        soundEnabled && questionSoundRef.current?.play()
      } else {
        visibleField[y][x] = CellState.FLAGGED
        soundEnabled && flagSoundRef.current?.play()
      }

      navigator.vibrate && navigator.vibrate(100)

      setVisibleField([...visibleField.map((i) => [...i])])
    },
    [gameStatus, visibleField, soundEnabled],
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
        soundEnabled && revealSoundRef.current?.play()
      } else {
        revealAllBombs(fieldMap, visibleField)
        onBomb()
      }

      // If we don't have any bombs on all of the neighbors then we can safely
      // reveal all of them
      if (fieldMap[y][x] === 0) {
        const neighborhood = neighborsPositions(y, x, size)
        neighborhood.forEach(([y1, x1]) => handleReveal(y1, x1, false))
      }

      if (updateState) setVisibleField([...visibleField.map((i) => [...i])])
    },
    [size, fieldMap, onBomb, onScore, visibleField, gameStatus, soundEnabled],
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
              flagged={visibleField[y][x] === CellState.FLAGGED}
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
  }, [visibleField])

  return (
    <>
      <S.MainContainer>{field}</S.MainContainer>
      <audio ref={flagSoundRef} autoPlay={false} controls={false}>
        <source src={flagSound} type="audio/mp3" />
      </audio>
      <audio ref={revealSoundRef} autoPlay={false} controls={false}>
        <source src={revealSound} type="audio/mp3" />
      </audio>
      <audio ref={questionSoundRef} autoPlay={false} controls={false}>
        <source src={questionSound} type="audio/mp3" />
      </audio>
    </>
  )
}

export default React.memo(MineField)
