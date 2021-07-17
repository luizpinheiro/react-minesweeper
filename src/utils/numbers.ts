export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const rangeArray = (size: number, value = 0): number[] => {
  const list = []
  for (let i = 1; i <= size; i += 1) list.push(value)
  return list
}
