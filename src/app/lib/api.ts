
import axios from "axios";
import { Movie, MovieDetailsTypes, Serie } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMovies(page: number = 1) {
    
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
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
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
        );
        return response.data.results.map((serie: Serie) => ({
            id: serie.id,
            href: `${serie.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            name: serie.name, // Ajuste para o campo correto da série
            first_air_date: serie.first_air_date, // Ajuste para a data de lançamento correta
        }));
    } catch (error) {
        console.error("Erro ao buscar séries:", error);
        return [];
    }
}

export async function getMovieDetails(id: string): Promise<MovieDetailsTypes | null> {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        return response.data; // Certifique-se de que response.data corresponde a MovieDetails
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        return null; // Ajuste se necessário, ou trate o erro na página
    }
}

export async function getSerieDetails(id: string): Promise<MovieDetailsTypes | null> {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );
        return response.data; // Certifique-se de que response.data corresponde a MovieDetails
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        return null; // Ajuste se necessário, ou trate o erro na página
    }
}