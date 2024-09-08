import axios from "axios";
import { Movie, MovieDetailsTypes, Serie, SerieDetailsTypes } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const LANGUAGE = "pt-BR";

export async function getMovies(page: number = 1) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
        );
        return response.data.results.map((movie: Movie) => ({
            id: movie.id,
            href: `${movie.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
        }));
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return [];
    }
}

export async function getSeries(page: number = 1) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
        );
        return response.data.results.map((serie: Serie) => ({
            id: serie.id,
            href: `${serie.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            name: serie.name,
            first_air_date: serie.first_air_date,
        }));
    } catch (error) {
        console.error("Erro ao buscar séries:", error);
        return [];
    }
}

export async function getMovieDetails(
    id: string
): Promise<MovieDetailsTypes | null> {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
        );

        const genres = response.data.genres.map(
            (genre: { name: string }) => genre.name
        );
        const voteAverage = response.data.vote_average;

        return {
            ...response.data,
            genres,
            vote_average: voteAverage,
        };
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        return null;
    }
}

export async function getSerieDetails(
    id: string
): Promise<SerieDetailsTypes | null> {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );

        const genres = response.data.genres.map(
            (genre: { name: string }) => genre.name
        );
        const voteAverage = response.data.vote_average;

        return {
            id: response.data.id,
            name: response.data.name,
            poster_path: response.data.poster_path,
            first_air_date: response.data.first_air_date,
            overview: response.data.overview,
            genres,
            vote_average: voteAverage,
        };
    } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
        return null;
    }
}
