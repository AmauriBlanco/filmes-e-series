"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMovies } from "../lib/api"; 
import { Movie } from "../lib/types"; 
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";

const MoviesPage = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies(); // Chama a função assíncrona
            console.log(data)
            setMovies(data);
        };
        fetchMovies();
    }, []);



    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            setFilteredMovies(
                movies.filter((movie) =>
                    movie.title.toLowerCase().includes(lowercasedQuery)
                )
            );
        } else {
            setFilteredMovies(movies);
        }
    }, [searchQuery, movies]);

    return (
        <div>
            <section>
                <div className="container">
                    <h2 className={style.sectionTitle}>Filmes Populares</h2>
                    <div className={style.cardContainer}>
                        {filteredMovies.map((movie) => (
                            <Card
                                key={movie.id}
                                href={movie.href}
                                imgSrc={movie.imgSrc}
                                title={movie.title}
                                releaseDate={movie.release_date} type={"detalhesFilmes"}                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MoviesPage;
