import axios from "axios";
import {
    Movie,
    MovieDetailsTypes,
    Serie,
    SerieDetailsTypes,
} from "../types/types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const LANGUAGE = "pt-BR";

async function getMovieOrSerie(page: number = 1, type: "movie" | "serie") {
    const urlType = type === "movie" ? "movie" : "tv";
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/${urlType}/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
        );
        if (type === "movie") {
            return response.data.results.map((type: Movie) => ({
                id: type.id,
                href: `${type.id}`,
                imgSrc: `https://image.tmdb.org/t/p/w500${type.poster_path}`,
                title: type.title,
                release_date: type.release_date,
            }));
        }
        return response.data.results.map((type: Serie) => ({
            id: type.id,
            href: `${type.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${type.poster_path}`,
            name: type.name,
            first_air_date: type.first_air_date,
        }));
    } catch (error) {
        console.error(`Erro ao buscar ${type}:`, error);
        return [];
    }
}

export async function getMovies(page: number = 1) {
    return getMovieOrSerie(page, "movie");
}

export async function getSeries(page: number = 1) {
    return getMovieOrSerie(page, "serie");
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
        }
        return {
            id: response.data.id,
            name: response.data.name,
            poster_path: response.data.poster_path,
            first_air_date: response.data.first_air_date,
            overview: response.data.overview,
            genres,
            vote_average: response.data.vote_average,
        } as SerieDetailsTypes;
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
        }
        return response.data.results.map((relate: Serie) => ({
            id: relate.id,
            href: `${relate.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${relate.poster_path}`,
            name: relate.name,
            first_air_date: relate.first_air_date,
        })) as Serie[];
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
