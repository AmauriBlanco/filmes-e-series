"use client";
import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { getMovieDetails, getMovies } from "../../lib/api"; 
import { Movie, MovieDetailsTypes } from "../../lib/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderEmAlta from "@/app/components/HeaderSections/HeaderEmAlta";

const MovieDetailsPage = () => {
    const { id } = useParams(); // Use useParams para obter o ID da URL
    const [movie, setMovie] = useState<MovieDetailsTypes | null>(null);
    const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const data = await getMovieDetails(`${id}`);
                setMovie(data);
            };
            fetchMovieDetails();
        }
    }, [id]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies(); // Chama a função assíncrona
            setSuggestedMovies(data.slice(0, 4)); // Define os filmes sugeridos
        };
        fetchMovies();
    }, []);

    if (!movie) return <div>Carregando...</div>;

    return (
        <div>
            <section>
                <div className="container">
                    <h1>{movie.title}</h1>
                    <Image
                        alt={movie.title}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        width={200}
                        height={400}
                    />
                    <p>Data de lançamento: {movie.release_date}</p>
                    <p>Descrição: {movie.overview}</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <HeaderEmAlta title="Filmes relacionados" url="movies" />
                    <div className={style.cardContainer}>
                        {suggestedMovies.map((movie) => (
                            <Card
                                key={movie.id}
                                href={movie.href}
                                imgSrc={movie.imgSrc}
                                title={movie.title}
                                releaseDate={movie.release_date}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetailsPage;
