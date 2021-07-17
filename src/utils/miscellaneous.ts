import { randomNumber, rangeArray } from './numbers'

export const calcBombsNumber = (size: number) =>
  Math.round((size * size * randomNumber(14, 20)) / 100)

export const generateMap = (size: number, bombsNumber: number): number[][] => {
  const totalPlaces = size * size

  const map = rangeArray(size, 0).map(() => rangeArray(size, 0))
  const bombsMap = rangeArray(size, 0).map(() => rangeArray(size, 0))

  // Place bombs across the map
  for (let i = 0; i < bombsNumber; i += 1) {
    let bombpositionY
    let bombpositionX
    do {
      bombpositionY = randomNumber(0, size - 1)
      bombpositionX = randomNumber(0, size - 1)
    } while (map[bombpositionY][bombpositionX] === -1)

    map[bombpositionY][bombpositionX] = -1
    bombsMap[bombpositionY][bombpositionX] = 1
  }

  // Update neighborhood positions with the bomb counters
  for (let position = 0; position < totalPlaces; position += 1) {
    const positionY = position % size
    const positionX = Math.floor(position / size)
    // If we have a bomb, skip
    if (map[positionY][positionX] > -1) {
      let bombs = 0
      // checking NorthWest position
      if (
        bombsMap[positionY - 1] &&
        bombsMap[positionY - 1][positionX - 1] === 1
      )
        bombs += 1
      // Checking North position
      if (bombsMap[positionY][positionX - 1] === 1) bombs += 1
      // Checking NorthEast
      if (
        bombsMap[positionY + 1] &&
        bombsMap[positionY + 1][positionX - 1] === 1
      )
        bombs += 1
      // Checking West position
      if (bombsMap[positionY - 1] && bombsMap[positionY - 1][positionX] === 1)
        bombs += 1
      // Checking East position
      if (bombsMap[positionY + 1] && bombsMap[positionY + 1][positionX] === 1)
        bombs += 1
      // Checking SouthWest position
      if (
        bombsMap[positionY - 1] &&
        bombsMap[positionY - 1][positionX + 1] === 1
      )
        bombs += 1
      // Checking South position
      if (bombsMap[positionY][positionX + 1] === 1) bombs += 1
      // Checking SouthEast position
      if (
        bombsMap[positionY + 1] &&
        bombsMap[positionY + 1][positionX + 1] === 1
      )
        bombs += 1

      map[positionY][positionX] = bombs
    }
  }
  return map
}
