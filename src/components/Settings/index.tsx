import React from 'react'

import * as S from './styles'

type Props = {
  soundEnabled: boolean
  onToggleSound: () => void
  size: number
  onDifficultyChange: (size: number) => void
}

const Settings = ({
  soundEnabled,
  onToggleSound,
  size,
  onDifficultyChange,
}: Props) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10)
    onDifficultyChange(newSize)
  }

  return (
    <S.MainContainer>
      <label>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={onToggleSound}
        />{' '}
        Sounds On
      </label>
      <S.SelectDifficulty value={size} onChange={handleDifficultyChange}>
        <option value={8}>very easy</option>
        <option value={12}>easy</option>
        <option value={16}>medium</option>
        <option value={32}>hard</option>
        <option value={40}>I dare you</option>
      </S.SelectDifficulty>
    </S.MainContainer>
  )
}

export default React.memo(Settings)
