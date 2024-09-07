// lib/api.ts
import axios from "axios";
import { Movie, Serie } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMovies() {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        return response.data.results.map((movie: Movie) => ({
            id: movie.id,
            href: `/movie/${movie.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
        }));
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return [];
    }
}

export async function getSeries() {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
        );
        return response.data.results.map((serie: Serie) => ({
            id: serie.id,
            href: `/tv/${serie.id}`,
            imgSrc: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            name: serie.name, // Ajuste para o campo correto da série
            first_air_date: serie.first_air_date, // Ajuste para a data de lançamento correta
        }));
    } catch (error) {
        console.error("Erro ao buscar séries:", error);
        return [];
    }
}
