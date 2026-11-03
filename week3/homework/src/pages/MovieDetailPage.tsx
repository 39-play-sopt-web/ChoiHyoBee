import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getMovieDetail } from '../apis/movie'
import Header from '../components/Header'
import type { MovieDetail } from '../types/movie'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

function formatMoney(amount: number) {
  if (amount === 0) {
    return '정보 없음'
  }

  return `$${amount.toLocaleString('en-US')}`
}

function MovieDetailPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false
    const id = Number(movieId)

    async function loadMovieDetail() {
      if (Number.isNaN(id)) {
        setError('올바르지 않은 영화 ID입니다.')
        setIsLoading(false)
        return
      }

      try {
        const data = await getMovieDetail(id)

        if (!isCancelled) {
          setMovie(data)
        }
      } catch {
        if (!isCancelled) {
          setError('영화 상세 정보를 불러오지 못했습니다.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    window.scrollTo(0, 0)
    void loadMovieDetail()

    return () => {
      isCancelled = true
    }
  }, [movieId])

  return (
    <>
      <Header />

      <main className="px-5 py-8 sm:px-10 lg:px-20">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-semibold text-[#65d8c5] no-underline hover:text-[#8cebe4]"
        >
          ← 목록으로 돌아가기
        </Link>

        {isLoading && (
          <p className="py-20 text-center text-sm text-white/60">
            영화 정보를 불러오는 중입니다...
          </p>
        )}

        {error && (
          <p className="py-20 text-center text-sm text-red-300">{error}</p>
        )}

        {movie && (
          <article className="relative isolate overflow-hidden rounded-2xl bg-[#15151d] p-5 sm:p-8">
            {movie.backdrop_path && (
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
                }}
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#15151d]/40 via-[#15151d]/85 to-[#15151d]" />

            <section className="grid gap-8 md:grid-cols-[220px_1fr]">
              {movie.poster_path ? (
                <img
                  className="w-full max-w-[220px] rounded-xl shadow-2xl"
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={`${movie.title} 포스터`}
                />
              ) : (
                <div className="flex aspect-[2/3] w-full max-w-[220px] items-center justify-center rounded-xl bg-white/10 text-sm text-white/50">
                  포스터 없음
                </div>
              )}

              <div>
                <h1 className="mb-4 text-3xl font-extrabold text-white">
                  {movie.title}
                </h1>

                <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70">
                  <span className="rounded-full bg-[#8cebe4] px-3 py-1 font-bold text-[#1b1b25]">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                  <span>{movie.release_date || '개봉일 정보 없음'}</span>
                  <span>{movie.runtime ? `${movie.runtime}분` : '상영 시간 정보 없음'}</span>
                  <span>투표 {movie.vote_count.toLocaleString()}개</span>
                  <span className="rounded border border-white/20 px-2 py-1">
                    {movie.status}
                  </span>
                </div>

                <div className="mb-8 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-[#65d8c5]/15 px-3 py-1 text-xs font-semibold text-[#8cebe4]"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h2 className="mb-3 text-lg font-bold text-white">줄거리</h2>
                <p className="leading-7 text-white/70">
                  {movie.overview || '등록된 줄거리가 없습니다.'}
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-5 w-1 rounded-full bg-[#65d8c5]" />
                <h2 className="text-lg font-bold text-white">기본 정보</h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <dl className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                  <InfoRow label="원제" value={movie.original_title} />
                  <InfoRow label="원어" value={movie.original_language} />
                  <InfoRow
                    label="제작 국가"
                    value={
                      movie.production_countries
                        .map((country) => country.name)
                        .join(', ') || '정보 없음'
                    }
                  />
                  <InfoRow
                    label="사용 언어"
                    value={
                      movie.spoken_languages
                        .map((language) => language.name || language.english_name)
                        .join(', ') || '정보 없음'
                    }
                  />
                </dl>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <MoneyPanel
                    label="제작 예산"
                    value={formatMoney(movie.budget)}
                  />
                  <MoneyPanel
                    label="전 세계 수익"
                    value={formatMoney(movie.revenue)}
                    highlight
                  />
                </div>
              </div>
            </section>
          </article>
        )}
      </main>
    </>
  )
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 hover:bg-white/5">
      <dt className="text-xs font-semibold tracking-wide text-[#65d8c5]">
        {label}
      </dt>
      <dd className="m-0 text-sm font-medium text-white/85">{value}</dd>
    </div>
  )
}

interface MoneyPanelProps {
  label: string
  value: string
  highlight?: boolean
}

function MoneyPanel({ label, value, highlight = false }: MoneyPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${
        highlight
          ? 'border-[#65d8c5]/40 bg-[#65d8c5]/10'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-white/50">
        {label}
      </p>
      <p
        className={`relative text-xl font-extrabold sm:text-2xl ${
          highlight ? 'text-[#8cebe4]' : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default MovieDetailPage
