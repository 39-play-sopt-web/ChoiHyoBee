import { createPortal } from 'react-dom'

function ResultModal({ level, resultTime, onConfirm }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-80 rounded-2xl bg-white p-7 text-center shadow-xl">
        <h2 className="mb-3 text-xl font-bold">🎉 Level {level} 클리어!</h2>
        <p className="mb-6 text-4xl font-bold">{resultTime.toFixed(2)}초</p>
        <button
          type="button"
          className="w-full rounded-lg bg-teal-200 py-3 font-semibold"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default ResultModal
