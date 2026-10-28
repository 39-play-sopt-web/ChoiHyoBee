export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  overview: string
  vote_average: number
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface Genre {
  id: number
  name: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  name: string
}

export interface MovieDetail {
  id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genres: Genre[]
  vote_average: number
  vote_count: number
  runtime: number | null
  status: string
  budget: number
  revenue: number
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
}
