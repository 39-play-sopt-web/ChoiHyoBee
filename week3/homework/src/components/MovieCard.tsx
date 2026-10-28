import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white/5 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl">
      {movie.poster_path ? (
        <img
          className="aspect-[2/3] w-full object-cover"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-white/10 text-sm text-white/50">
          포스터 없음
        </div>
      )}

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-white">{movie.title}</h3>
          <span className="shrink-0 text-sm font-semibold text-[#8cebe4]">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <p className="mb-3 text-xs text-white/50">
          {movie.release_date || '개봉일 정보 없음'}
        </p>
        <p className="line-clamp-3 text-sm leading-6 text-white/70">
          {movie.overview || '등록된 줄거리가 없습니다.'}
        </p>
      </div>
    </article>
  )
}

export default MovieCard
