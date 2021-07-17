import React, { useEffect, useState } from 'react'

import * as S from './styles'
import SegmentDisplay from '../SegmentDisplay'
import { GameStatus } from '../../types/enums'

type Props = {
  gameStatus: GameStatus
}

const Clock = ({ gameStatus }: Props) => {
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [intervalId, setIntervalId] = useState<number | null>(null)

  useEffect(() => {
    if (gameStatus === GameStatus.IDLE) {
      setSecondsPassed(0)
      if (intervalId) window.clearInterval(intervalId)
    }

    if (gameStatus === GameStatus.ONGOING) {
      setSecondsPassed(0)
      setIntervalId(
        window.setInterval(() => setSecondsPassed((s) => s + 1), 1000),
      )
    }
    if (
      (gameStatus === GameStatus.LOST ||
        gameStatus === GameStatus.IDLE ||
        GameStatus.WIN) &&
      intervalId
    ) {
      window.clearInterval(intervalId)
    }
  }, [gameStatus])
  return (
    <S.MainContainer>
      <SegmentDisplay number={secondsPassed} places={3} />
    </S.MainContainer>
  )
}

export default Clock
