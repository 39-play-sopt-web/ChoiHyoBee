import { useState } from 'react'

interface RatingFilterItem {
  label: string
  minRating?: number
  maxRating?: number
}

interface RatingFilterProps {
  onFilterChange: (minRating?: number, maxRating?: number) => void
}

const FILTERS: RatingFilterItem[] = [
  { label: '전체' },
  { label: '9점 이상', minRating: 9 },
  { label: '8 ~ 9점', minRating: 8, maxRating: 9 },
  { label: '7 ~ 8점', minRating: 7, maxRating: 8 },
  { label: '6 ~ 7점', minRating: 6, maxRating: 7 },
  { label: '6점 미만', maxRating: 5.9 },
]

function RatingFilter({ onFilterChange }: RatingFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState('전체')

  function handleFilterClick(filter: RatingFilterItem) {
    setSelectedFilter(filter.label)
    onFilterChange(filter.minRating, filter.maxRating)
  }

  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isSelected = selectedFilter === filter.label

          return (
            <button
              key={filter.label}
              type="button"
              onClick={() => handleFilterClick(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                isSelected
                  ? 'bg-[#8cebe4] text-[#1b1b25]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default RatingFilter
