import React from 'react'

import * as S from './styles'
import { GameStatus } from '../../types/enums'
import deadImage from './dead.png'
import sleepingImage from './sleeping.png'
import smileImage from './smile.png'
import inLoveImage from './in-love.png'
import scaredImage from './scared.png'

type Props = {
  gameStatus: GameStatus
  onClick: () => void
  pressing: boolean
}
const ControlButtom = ({ gameStatus, pressing, onClick }: Props) => (
  <S.MainContainer>
    <S.Button type="button" onClick={onClick}>
      <img
        alt=""
        src={deadImage}
        width={32}
        height={32}
        style={{ display: gameStatus === GameStatus.LOST ? 'block' : 'none' }}
      />
      <img
        alt=""
        src={inLoveImage}
        width={32}
        height={32}
        style={{ display: gameStatus === GameStatus.WIN ? 'block' : 'none' }}
      />
      <img
        alt=""
        src={sleepingImage}
        width={32}
        height={32}
        style={{ display: gameStatus === GameStatus.IDLE ? 'block' : 'none' }}
      />
      <img
        alt=""
        src={smileImage}
        width={32}
        height={32}
        style={{
          display:
            gameStatus === GameStatus.ONGOING && !pressing ? 'block' : 'none',
        }}
      />
      <img
        alt=""
        src={scaredImage}
        width={32}
        height={32}
        style={{
          display:
            gameStatus === GameStatus.ONGOING && pressing ? 'block' : 'none',
        }}
      />
    </S.Button>
  </S.MainContainer>
)

export default ControlButtom
