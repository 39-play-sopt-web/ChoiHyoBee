function Header({ menu, setMenu }) {
  return (
    <header className="grid h-12 grid-cols-3 items-center bg-white px-6 shadow-sm">
      <h1 className="font-bold">🔢 숫자 클릭 게임</h1>

      <nav className="flex justify-self-center gap-2">
        <button
          type="button"
          className={
            menu === 'game'
              ? 'rounded-lg bg-teal-200 px-4 py-2 font-semibold'
              : 'px-4 py-2 text-gray-500'
          }
          onClick={() => setMenu('game')}
        >
          게임
        </button>

        <button
          type="button"
          className={
            menu === 'ranking'
              ? 'rounded-lg bg-teal-200 px-4 py-2 font-semibold'
              : 'px-4 py-2 text-gray-500'
          }
          onClick={() => setMenu('ranking')}
        >
          랭킹
        </button>
      </nav>

      <div className="justify-self-end">
        {menu === 'game' && (
          <div className="flex items-center gap-3">
            <select
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              aria-label="레벨 선택"
            >
              <option>Level 1 (3x3)</option>
              <option>Level 2 (4x4)</option>
              <option>Level 3 (5x5)</option>
            </select>

            <span className="rounded-md bg-teal-200 px-3 py-1 text-sm font-bold">
              0.00초
            </span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
