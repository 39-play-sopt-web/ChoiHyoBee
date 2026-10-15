import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function makeNumbers(start, end) {
  const numbers = []

  for (let number = start; number <= end; number += 1) {
    numbers.push(number)
  }

  return numbers
}

function mixNumbers(numbers) {
  const copiedNumbers = [...numbers]

  copiedNumbers.sort(() => Math.random() - 0.5)

  return copiedNumbers
}

function getBoxSize(level) {
  if (level === 1) return 'h-28 w-28'
  if (level === 2) return 'h-24 w-24'
  return 'h-20 w-20'
}

function Game({ level, setTime }) {
  const boardSize = level + 2
  const halfNumber = boardSize * boardSize
  const lastNumber = halfNumber * 2
  const firstNumbers = makeNumbers(1, halfNumber)
  const laterNumbers = makeNumbers(halfNumber + 1, lastNumber)
  const boxSize = getBoxSize(level)

  const [board, setBoard] = useState(() => mixNumbers(firstNumbers))
  const [waitingNumbers, setWaitingNumbers] = useState(() =>
    mixNumbers(laterNumbers),
  )
  const [targetNumber, setTargetNumber] = useState(1)
  const [isStarted, setIsStarted] = useState(false)
  const [resultTime, setResultTime] = useState(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (!isStarted) return

    const timer = setInterval(() => {
      const newTime = (performance.now() - startTimeRef.current) / 1000
      setTime(newTime)
    }, 10)

    return () => clearInterval(timer)
  }, [isStarted, setTime])

  function resetGame() {
    setBoard(mixNumbers(firstNumbers))
    setWaitingNumbers(mixNumbers(laterNumbers))
    setTargetNumber(1)
    setIsStarted(false)
    setTime(0)
  }

  function saveRecord(playTime) {
    const records = JSON.parse(localStorage.getItem('gameRecords')) || []

    records.push({
      playedAt: new Date().toISOString(),
      level,
      playTime: Number(playTime.toFixed(2)),
    })

    localStorage.setItem('gameRecords', JSON.stringify(records))
  }

  function clickNumber(number, index, clickedTime) {
    if (number !== targetNumber) return

    if (number === 1) {
      startTimeRef.current = clickedTime
      setIsStarted(true)
    }

    if (number === lastNumber) {
      const clearTime = (clickedTime - startTimeRef.current) / 1000

      setIsStarted(false)
      setTime(clearTime)
      saveRecord(clearTime)
      setResultTime(clearTime)
      return
    }

    setBoard((oldBoard) =>
      oldBoard.map((item, itemIndex) => {
        if (itemIndex !== index) return item
        if (number <= halfNumber) return waitingNumbers[0]
        return null
      }),
    )

    if (number <= halfNumber) {
      setWaitingNumbers((numbers) => numbers.slice(1))
    }

    setTargetNumber(number + 1)
  }

  return (
    <>
      <main className="flex flex-1 justify-center bg-[#c8f8f6] pt-14">
        <section className="text-center">
          <p className="mb-8 text-2xl font-semibold">
            다음 숫자: <span className="font-bold">{targetNumber}</span>{' '}
            <span className="text-lg text-gray-500">
              ({targetNumber}/{lastNumber})
            </span>
          </p>

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
          >
            {board.map((number, index) =>
              number === null ? (
                <div key={index} className={boxSize} />
              ) : (
                <button
                  key={index}
                  type="button"
                  className={`${boxSize} rounded-xl bg-white text-3xl font-bold shadow-sm transition active:scale-90 active:bg-teal-200`}
                  onClick={(event) =>
                    clickNumber(number, index, event.timeStamp)
                  }
                >
                  {number}
                </button>
              ),
            )}
          </div>
        </section>
      </main>

      {resultTime !== null &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
            <div className="w-80 rounded-2xl bg-white p-7 text-center shadow-xl">
              <h2 className="mb-3 text-xl font-bold">
                🎉 Level {level} 클리어!
              </h2>
              <p className="mb-6 text-4xl font-bold">
                {resultTime.toFixed(2)}초
              </p>
              <button
                type="button"
                className="w-full rounded-lg bg-teal-200 py-3 font-semibold"
                onClick={() => {
                  setResultTime(null)
                  resetGame()
                }}
              >
                확인
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default Game
