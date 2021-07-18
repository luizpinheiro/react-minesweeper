import { GameStatus } from '../../types/enums'
import { calcBombsNumber, generateMap } from '../../utils/miscellaneous'

export enum Actions {
  'INCREASE_SCORE',
  'RESET',
  'BOMB_HIT',
  'PRESS_START',
  'PRESS_END',
  'CHANGE_DIFFICULTY',
  'TOGGLE_SOUND',
}

export type State = {
  size: number
  soundEnabled: boolean
  totalBombs: number
  map: number[][]
  score: number
  status: GameStatus
  pressing: boolean
}

export type Action = {
  type: Actions
  newSize?: number
}

const INITIAL_SIZE = 12

export const initialState: State = {
  size: INITIAL_SIZE,
  soundEnabled: true,
  totalBombs: calcBombsNumber(INITIAL_SIZE),
  map: generateMap(INITIAL_SIZE, calcBombsNumber(INITIAL_SIZE)),
  score: 0,
  status: GameStatus.IDLE,
  pressing: false,
}

export default (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.RESET:
      return {
        ...state,
        score: 0,
        status: GameStatus.IDLE,
        map: generateMap(state.size, state.totalBombs),
      }
    case Actions.INCREASE_SCORE: {
      const scoreForWin = state.size * state.size - state.totalBombs
      return {
        ...state,
        score: state.score + 1,
        status:
          state.score + 1 === scoreForWin ? GameStatus.WIN : GameStatus.ONGOING,
      }
    }
    case Actions.PRESS_START:
      return {
        ...state,
        pressing: true,
      }
    case Actions.PRESS_END:
      return {
        ...state,
        pressing: false,
      }
    case Actions.BOMB_HIT:
      return {
        ...state,
        status: GameStatus.LOST,
      }
    case Actions.CHANGE_DIFFICULTY: {
      const newSize = action.newSize || 16
      const totalBombs = calcBombsNumber(newSize)
      return {
        ...state,
        score: 0,
        size: newSize,
        status: GameStatus.IDLE,
        totalBombs,
        map: generateMap(newSize, totalBombs),
      }
    }
    case Actions.TOGGLE_SOUND:
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      }
    default:
      return state
  }
}
