export function makeNumbers(start, end) {
  const numbers = []

  for (let number = start; number <= end; number += 1) {
    numbers.push(number)
  }

  return numbers
}

export function mixNumbers(numbers) {
  const copiedNumbers = [...numbers]

  copiedNumbers.sort(() => Math.random() - 0.5)

  return copiedNumbers
}

export function getBoxSize(level) {
  if (level === 1) return 'h-28 w-28'
  if (level === 2) return 'h-24 w-24'
  return 'h-20 w-20'
}
