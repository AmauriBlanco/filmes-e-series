"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetails, getRelatedMovie } from "../../../services/utils/api";
import { Movie, MovieDetailsTypes } from "../../../services/types/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderSections from "@/app/components/HeaderSections/HeaderSections";
import { ImSpinner2 } from "react-icons/im";

export default function MovieDetailsPage() {
    const { id } = useParams(); // Use useParams para obter o ID da URL
    const [movie, setMovie] = useState<MovieDetailsTypes | null>(null);
    const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const AVERAGE_GRADE = 7;

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const data = await getMovieDetails(`${id}`);
                setMovie(data as MovieDetailsTypes);
            };
            fetchMovieDetails();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const fetchRelatedMovies = async () => {
                const data = await getRelatedMovie(`${id}`);
                if (data !== null) {
                    setSuggestedMovies(data.slice(0, 5) as Movie[]);
                }
            };
            fetchRelatedMovies();
        }
    }, [id]);

    const handleToggleOverview = () => {
        setIsExpanded(!isExpanded);
    };

    if (!movie)
        return (
            <div className="spinner">
                <ImSpinner2 />
            </div>
        );

    return (
        <div>
            <section>
                <div className="container">
                    <div className={style.detalhes}>
                        <Image
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            width={200}
                            height={400}
                            priority
                        />
                        <div className={style.detalheInfo}>
                            <div className={style.infoBottom}>
                                <h1 className={style.title}>{movie.title}</h1>
                                <p
                                    className={`${
                                        movie.vote_average < AVERAGE_GRADE
                                            ? style.average
                                            : style.aboveAverage
                                    } ${style.vote}`}
                                >
                                    {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                            <div className={style.infoBottom}>
                                <p className={style.genres}>
                                    <span>Gênero</span>{" "}
                                    {movie.genres.join(", ")}
                                </p>
                                <p className={style.release}>
                                    <span>Estreia</span>{" "}
                                    {new Intl.DateTimeFormat("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }).format(new Date(movie.release_date))}
                                </p>
                            </div>

                            <p
                                className={`${style.overview} ${
                                    isExpanded ? style.expanded : ""
                                }`}
                            >
                                <span>Sinopse</span> {movie.overview}
                            </p>
                            <button
                                className={style.showMore}
                                onClick={handleToggleOverview}
                            >
                                {isExpanded ? "Ver menos" : "Ver mais"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.sugestao}>
                <div className="container">
                    <HeaderSections title="Filmes relacionados" url="filmes" />
                    <div className={style.cardContainer}>
                        {suggestedMovies.map((movie) => (
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
                </div>
            </section>
        </div>
    );
}
