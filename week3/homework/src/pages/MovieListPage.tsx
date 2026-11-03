import { useEffect, useRef, useState } from 'react'
import { getMovies } from '../apis/movie'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import RatingFilter from '../components/RatingFilter'
import type { Movie } from '../types/movie'

interface RatingRange {
  minRating?: number
  maxRating?: number
}

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [ratingRange, setRatingRange] = useState<RatingRange>({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function loadMovies() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getMovies({ page, ...ratingRange })

        if (!isCancelled) {
          setMovies((currentMovies) => [...currentMovies, ...data.results])
          setHasNextPage(data.page < data.total_pages)
        }
      } catch {
        if (!isCancelled) {
          setError('영화 목록을 불러오지 못했습니다.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadMovies()

    return () => {
      isCancelled = true
    }
  }, [page, ratingRange])

  useEffect(() => {
    const target = loadMoreRef.current

    if (!target || isLoading || !hasNextPage || error) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((currentPage) => currentPage + 1)
        }
      },
      {
        rootMargin: '300px',
      },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [error, hasNextPage, isLoading])

  function handleFilterChange(minRating?: number, maxRating?: number) {
    setMovies([])
    setPage(1)
    setHasNextPage(true)
    setRatingRange({ minRating, maxRating })
  }

  return (
    <>
      <Header />

      <main className="px-5 py-10 sm:px-10 lg:px-20">
        <h2 className="mb-4 text-[20px] font-extrabold text-white">
          영화 둘러보기
        </h2>
        <RatingFilter onFilterChange={handleFilterChange} />

        {movies.length > 0 && (
          <section className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        )}

        {isLoading && (
          <p className="py-10 text-center text-sm text-white/60">
            영화를 불러오는 중입니다...
          </p>
        )}

        {error && (
          <p className="py-10 text-center text-sm text-red-300">{error}</p>
        )}

        {!isLoading && !error && hasNextPage && (
          <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
        )}
      </main>
    </>
  )
}

export default MovieListPage
