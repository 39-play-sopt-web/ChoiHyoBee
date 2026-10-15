import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const firstNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const laterNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18]

function mixNumbers(numbers) {
  const copiedNumbers = [...numbers]

  copiedNumbers.sort(() => Math.random() - 0.5)

  return copiedNumbers
}

function Game({ setTime }) {
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
      level: 1,
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

    if (number === 18) {
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
        if (number <= 9) return waitingNumbers[0]
        return null
      }),
    )

    if (number <= 9) {
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
              ({targetNumber}/18)
            </span>
          </p>

          <div className="grid grid-cols-3 gap-4">
            {board.map((number, index) =>
              number === null ? (
                <div key={index} className="h-28 w-28" />
              ) : (
                <button
                  key={index}
                  type="button"
                  className="h-28 w-28 rounded-xl bg-white text-3xl font-bold shadow-sm"
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
              <h2 className="mb-3 text-xl font-bold">🎉 Level 1 클리어!</h2>
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
