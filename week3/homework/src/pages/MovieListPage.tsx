import { useEffect, useState } from 'react'
import { getMovies } from '../apis/movie'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import RatingFilter from '../components/RatingFilter'
import type { Movie } from '../types/movie'

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function loadMovies() {
      try {
        const data = await getMovies()

        if (!isCancelled) {
          setMovies(data.results)
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
  }, [])

  return (
    <>
      <Header />

      <main className="px-5 py-10 sm:px-10 lg:px-20">
        <h2 className="mb-4 text-[20px] font-extrabold text-white">
          영화 둘러보기
        </h2>
        <RatingFilter />

        {isLoading && (
          <p className="py-20 text-center text-sm text-white/60">
            영화를 불러오는 중입니다...
          </p>
        )}

        {error && (
          <p className="py-20 text-center text-sm text-red-300">{error}</p>
        )}

        {!isLoading && !error && (
          <section className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default MovieListPage
