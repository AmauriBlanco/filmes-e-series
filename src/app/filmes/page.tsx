"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMovies } from "../lib/api";
import { Movie } from "../lib/types";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import Pagination from "../components/Pagination/Pagination";
import { ImSpinner2 } from "react-icons/im";

export default function MoviesPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [childCount, setChildCount] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies(page);
            setMovies(data);
        };
        fetchMovies();
    }, [page]);

    useEffect(() => {
        if (movies) {
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
        }
    }, [searchQuery, movies]);

    useEffect(() => {
        if (filteredMovies) {
            setChildCount(filteredMovies.length);
        }
    }, [filteredMovies]);

    if (movies === null) {
        return (
            <div className="spinner">
                <ImSpinner2 />
            </div>
        );
    }

    return (
        <div>
            <section>
                <div className="container">
                    <h2 className={style.sectionTitle}>Filmes Populares</h2>
                    <div
                        className={`${style.cardContainer} ${
                            childCount >= 4
                                ? style.has4OrMore
                                : childCount === 3
                                ? style.has3
                                : childCount === 2
                                ? style.has2
                                : style.has1
                        }`}
                    >
                        {filteredMovies.map((movie) => (
                            <Card
                                key={movie.id}
                                href={movie.href}
                                imgSrc={movie.imgSrc}
                                title={movie.title}
                                releaseDate={movie.release_date}
                                type="detalhes-filme"
                            />
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage} />
                </div>
            </section>
        </div>
    );
}
