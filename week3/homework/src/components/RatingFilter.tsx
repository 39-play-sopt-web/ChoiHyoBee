import { useState } from 'react'

const FILTERS = [
  '전체',
  '9점 이상',
  '8 ~ 9점',
  '7 ~ 8점',
  '6 ~ 7점',
  '6점 미만',
] as const

type RatingFilterOption = (typeof FILTERS)[number]

function RatingFilter() {
  const [selectedFilter, setSelectedFilter] =
    useState<RatingFilterOption>('전체')

  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isSelected = selectedFilter === filter

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                isSelected
                  ? 'bg-[#8cebe4] text-[#1b1b25]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default RatingFilter
