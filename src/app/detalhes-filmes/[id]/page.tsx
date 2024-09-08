"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovies } from "../../lib/api";
import { Movie, MovieDetailsTypes } from "../../lib/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderEmAlta from "@/app/components/HeaderSections/HeaderEmAlta";
import { ImSpinner2 } from "react-icons/im";

const MovieDetailsPage = () => {
    const { id } = useParams(); // Use useParams para obter o ID da URL
    const [movie, setMovie] = useState<MovieDetailsTypes | null>(null);
    const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const data = await getMovieDetails(`${id}`);
                setMovie(data);
            };
            fetchMovieDetails();
        }
    }, [id]);

    function getRandomIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies(getRandomIndex(100)); // Pega os filmes randomizando suas páginas de 0 até 500
            const randomIndex = getRandomIndex(data.length - 4);
            setSuggestedMovies(data.slice(randomIndex, randomIndex + 4)); //captura 4 elementos de forma randômica
        };
        fetchMovies();
    }, []);

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
                                        movie.vote_average < 7
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
                    <HeaderEmAlta title="Filmes relacionados" url="filmes" />
                    <div className={style.cardContainer}>
                        {suggestedMovies.map((movie) => (
                            <Card
                                key={movie.id}
                                href={movie.href}
                                imgSrc={movie.imgSrc}
                                title={movie.title}
                                releaseDate={movie.release_date}
                                type="detalhes-filmes"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetailsPage;
