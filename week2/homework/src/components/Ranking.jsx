import { useState } from 'react'

function getRecords() {
  const records = JSON.parse(localStorage.getItem('gameRecords')) || []

  records.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level
    }

    return a.playTime - b.playTime
  })

  return records
}

function formatDate(dateText) {
  const date = new Date(dateText)

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Ranking() {
  const [records, setRecords] = useState(getRecords)

  function resetRecords() {
    localStorage.removeItem('gameRecords')
    setRecords([])
  }

  return (
    <main className="flex-1 bg-gradient-to-br from-cyan-100 to-emerald-200 px-6 pt-14">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">🏆 랭킹</h2>
          <button
            type="button"
            className="rounded-lg border border-red-400 px-4 py-2 font-semibold text-red-500"
            onClick={resetRecords}
          >
            초기화
          </button>
        </div>

        {records.length === 0 ? (
          <div className="rounded-xl bg-white py-16 text-center shadow-sm">
            <p className="text-lg text-gray-500">아직 기록이 없어요.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-teal-200">
                <tr>
                  <th className="px-5 py-4">순위</th>
                  <th className="px-5 py-4">레벨</th>
                  <th className="px-5 py-4">플레이 시간</th>
                  <th className="px-5 py-4">기록 시각</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={`${record.playedAt}-${index}`}
                    className="border-t border-gray-200"
                  >
                    <td className="px-5 py-4 font-semibold">{index + 1}</td>
                    <td className="px-5 py-4">Level {record.level}</td>
                    <td className="px-5 py-4">{record.playTime.toFixed(2)}초</td>
                    <td className="px-5 py-4">
                      {formatDate(record.playedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default Ranking
