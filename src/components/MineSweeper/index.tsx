import React, { useCallback, useReducer } from 'react'

import * as S from './styles'
import Clock from '../Clock'
import Score from '../Score'
import ControlButton from '../ControlButton'
import MineField from '../MineField'
import reducer, { Actions, initialState } from './reducer'

const Component = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  return (
    <>
      <S.MainContainer size={state.size}>
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
            Luiz C.
          </a>
        </S.SignatureContainer>
      </S.MainContainer>
    </>
  )
}

export default Component
