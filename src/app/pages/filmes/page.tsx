"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMovies } from "../../services/utils/api";
import { Movie } from "../../services/types/types";
import Card from "../../components/Card/Card";
import style from "./style.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { ImSpinner2 } from "react-icons/im";
import { CgSmileSad } from "react-icons/cg";

const MoviesClient = () => {
    const searchQuery = useSearchParams().get("search") || "";
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [childCount, setChildCount] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies(page);
                setMovies(data);
            } catch (error) {
                console.error("Falha ao carregar", error);
                setMovies([]);
            }
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
                                : childCount === 1
                                ? style.has1
                                : style.hasNone
                        }`}
                    >
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((movie) => (
                                <Card
                                    key={movie.id}
                                    href={movie.href}
                                    imgSrc={movie.imgSrc}
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                    type="detalhes-filme"
                                />
                            ))
                        ) : (
                            <div className={style.noItem}>
                                <CgSmileSad size={35} color="white" />
                                <p>
                                    Nenhum filme encontrado, continue
                                    tentando...
                                </p>
                            </div>
                        )}
                    </div>
                    {!searchQuery && (
                        <Pagination page={page} setPage={setPage} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default MoviesClient;
