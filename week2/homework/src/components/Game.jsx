import { useState } from 'react'
import useTimer from '../hooks/useTimer'
import { getBoxSize, makeNumbers, mixNumbers } from '../utils/gameUtils'
import { addRecord } from '../utils/storage'
import ResultModal from './ResultModal'

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
  const [resultTime, setResultTime] = useState(null)
  const { startTimer, stopTimer, resetTimer } = useTimer(setTime)

  function resetGame() {
    setBoard(mixNumbers(firstNumbers))
    setWaitingNumbers(mixNumbers(laterNumbers))
    setTargetNumber(1)
    resetTimer()
  }

  function clickNumber(number, index, clickedTime) {
    if (number !== targetNumber) return

    if (number === 1) {
      startTimer(clickedTime)
    }

    if (number === lastNumber) {
      const clearTime = stopTimer(clickedTime)

      addRecord({
        playedAt: new Date().toISOString(),
        level,
        playTime: Number(clearTime.toFixed(2)),
      })
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

      {resultTime !== null && (
        <ResultModal
          level={level}
          resultTime={resultTime}
          onConfirm={() => {
            setResultTime(null)
            resetGame()
          }}
        />
      )}
    </>
  )
}

export default Game
