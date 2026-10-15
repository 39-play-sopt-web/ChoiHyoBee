import { useEffect, useRef, useState } from 'react'

function useTimer(setTime) {
  const [running, setRunning] = useState(false)
  const startTime = useRef(0)

  useEffect(() => {
    if (!running) return

    const timerId = setInterval(() => {
      const passedTime = (performance.now() - startTime.current) / 1000
      setTime(passedTime)
    }, 10)

    return () => clearInterval(timerId)
  }, [running, setTime])

  function startTimer(time) {
    startTime.current = time
    setRunning(true)
  }

  function stopTimer(time) {
    const resultTime = (time - startTime.current) / 1000

    setRunning(false)
    setTime(resultTime)

    return resultTime
  }

  function resetTimer() {
    setRunning(false)
    setTime(0)
  }

  return { startTimer, stopTimer, resetTimer }
}

export default useTimer
