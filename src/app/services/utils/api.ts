import axios from "axios";
import {
    Movie,
    MovieDetailsTypes,
    Serie,
    SerieDetailsTypes,
} from "./types/types";

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

async function getDetails(
    type: "movie" | "tv",
    id: string
): Promise<MovieDetailsTypes | SerieDetailsTypes | null> {
    try {
        //URL base
        let url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`;

        // Adicionando o parâmetro 'language' apenas para filmes
        if (type === "movie") {
            url += `&language=${LANGUAGE}`;
        }

        const response = await axios.get(url);

        const genres = response.data.genres.map(
            (genre: { name: string }) => genre.name
        );

        if (type === "movie") {
            return {
                id: response.data.id,
                title: response.data.title,
                poster_path: response.data.poster_path,
                release_date: response.data.release_date,
                overview: response.data.overview,
                genres,
                vote_average: response.data.vote_average,
            } as MovieDetailsTypes;
        } else {
            return {
                id: response.data.id,
                name: response.data.name,
                poster_path: response.data.poster_path,
                first_air_date: response.data.first_air_date,
                overview: response.data.overview,
                genres,
                vote_average: response.data.vote_average,
            } as SerieDetailsTypes;
        }
    } catch (error) {
        console.error(
            `Erro ao buscar detalhes do ${
                type === "movie" ? "filme" : "série"
            }:`,
            error
        );
        return null;
    }
}

export async function getMovieDetails(id: string) {
    return getDetails("movie", `${id}`);
}

export async function getSerieDetails(id: string) {
    return getDetails("tv", `${id}`);
}

async function getRelated(
    type: "movie" | "tv",
    id: string
): Promise<Movie[] | Serie[] | null> {
    try {
        // Construindo a URL baseada no tipo
        const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${API_KEY}`;

        const response = await axios.get(url);

        if (type === "movie") {
            return response.data.results.map((relate: Movie) => ({
                id: relate.id,
                href: `${relate.id}`,
                imgSrc: `https://image.tmdb.org/t/p/w500${relate.poster_path}`,
                title: relate.title,
                release_date: relate.release_date,
            })) as Movie[];
        } else {
            return response.data.results.map((relate: Serie) => ({
                id: relate.id,
                href: `${relate.id}`,
                imgSrc: `https://image.tmdb.org/t/p/w500${relate.poster_path}`,
                name: relate.name,
                first_air_date: relate.first_air_date,
            })) as Serie[];
        }
    } catch (error) {
        console.error(
            `Erro ao carregar conteúdo relacionado para ${type}:`,
            error
        );
        return null;
    }
}

export async function getRelatedMovie(id: string) {
    return getRelated("movie", `${id}`);
}

export async function getRelatedSerie(id: string) {
    return getRelated("tv", `${id}`);
}
