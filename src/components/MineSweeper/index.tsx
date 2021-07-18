import React, { useCallback, useEffect, useReducer, useRef } from 'react'

import * as S from './styles'
import Clock from '../Clock'
import Score from '../Score'
import ControlButton from '../ControlButton'
import MineField from '../MineField'
import reducer, { Actions, initialState } from './reducer'
import explosionSound from './sounds/explosion.mp3'
import winSound from './sounds/win.mp3'
import { GameStatus } from '../../types/enums'

const Component = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const lostSoundRef = useRef<HTMLAudioElement>(null)
  const winSoundRef = useRef<HTMLAudioElement>(null)

  const handleReset = useCallback(() => {
    dispatch({
      type: Actions.RESET,
    })
  }, [dispatch])

  const handleScoreUp = useCallback(() => {
    dispatch({
      type: Actions.INCREASE_SCORE,
    })
  }, [dispatch])

  const handleBombHit = useCallback(() => {
    dispatch({
      type: Actions.BOMB_HIT,
    })
  }, [dispatch])

  const handlePressStart = useCallback(() => {
    dispatch({
      type: Actions.PRESS_START,
    })
  }, [dispatch])

  const handlePressEnd = useCallback(() => {
    dispatch({
      type: Actions.PRESS_END,
    })
  }, [dispatch])

  const handleDifficultyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10)
      dispatch({
        type: Actions.CHANGE_DIFFICULTY,
        newSize: value,
      })
    },
    [dispatch],
  )

  const handleToggleSound = useCallback(() => {
    dispatch({
      type: Actions.TOGGLE_SOUND,
    })
  }, [dispatch])

  useEffect(() => {
    lostSoundRef.current?.pause()
    winSoundRef.current?.pause()

    if (!state.soundEnabled) return

    if (state.status === GameStatus.LOST && lostSoundRef.current) {
      lostSoundRef.current.currentTime = 0
      lostSoundRef.current.play()
    }
    if (state.status === GameStatus.WIN && winSoundRef.current) {
      winSoundRef.current.currentTime = 0
      winSoundRef.current.play()
    }
  }, [state.status, state.soundEnabled])

  return (
    <>
      <S.MainContainer size={state.size}>
        <S.PreHeader>
          <label>
            <input
              type="checkbox"
              checked={state.soundEnabled}
              onChange={handleToggleSound}
            />{' '}
            Sounds On
          </label>
          <S.SelectDifficulty
            value={state.size}
            onChange={handleDifficultyChange}
          >
            <option value={8}>very easy</option>
            <option value={12}>easy</option>
            <option value={16}>medium</option>
            <option value={32}>hard</option>
            <option value={40}>I dare you</option>
          </S.SelectDifficulty>
        </S.PreHeader>
        <S.HeaderContainer>
          <Score current={state.score} />
          <ControlButton
            pressing={state.pressing}
            gameStatus={state.status}
            onClick={handleReset}
          />
          <Clock gameStatus={state.status} />
        </S.HeaderContainer>
        <S.BodyContainer>
          <MineField
            soundEnabled={state.soundEnabled}
            gameStatus={state.status}
            fieldMap={state.map}
            size={state.size}
            onScore={handleScoreUp}
            onBomb={handleBombHit}
            onPressStart={handlePressStart}
            onPressEnd={handlePressEnd}
          />
        </S.BodyContainer>
        <S.SignatureContainer>
          Made with React and a lot of <span>&#10084;</span> by{' '}
          <a
            href="https://www.linkedin.com/in/lcpalves/"
            target="_blank"
            rel="noreferrer"
          >
            Luiz C
          </a>
          . <br />
          Access the{' '}
          <a
            href="https://github.com/luizpinheiro/react-minesweeper/"
            target="_blank"
            rel="noreferrer"
          >
            project&apos;s github
          </a>{' '}
          to see the code.
        </S.SignatureContainer>
      </S.MainContainer>
      <audio ref={lostSoundRef} controls={false} autoPlay={false}>
        <source src={explosionSound} type="audio/mp3" />
      </audio>
      <audio ref={winSoundRef} controls={false} autoPlay={false}>
        <source src={winSound} type="audio/mp3" />
      </audio>
    </>
  )
}

export default Component
