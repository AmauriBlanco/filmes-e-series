import {
    getMovieDetails,
    getMovies,
    getRelatedMovie,
} from "../../../services/api/api";
import { Movie, MovieDetailsTypes } from "../../../services/types/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderSections from "@/app/components/HeaderSections/HeaderSections";
import { ImSpinner2 } from "react-icons/im";

// gerar os parâmetros estaticamente
export async function generateStaticParams() {
    const allIds = (await getMovies()).map((movie: Movie) => movie.id);
    return allIds.map((id: number) => ({ id: id.toString() }));
}

// title da página dinamico
export async function generateMetadata({ params }: { params: { id: string } }) {
    const movie = await getMovieDetails(params.id);
    return {
        title: (movie as MovieDetailsTypes).title || "Filme não encontrado",
    };
}

export default async function MovieDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const movie = (await getMovieDetails(params.id)) as MovieDetailsTypes;
    const suggestedMovies = (await getRelatedMovie(params.id))?.slice(
        0,
        5
    ) as Movie[];

    const AVERAGE_GRADE = 7;

    if (!movie) {
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
                    <div className={style.detalhes}>
                        <Image
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            width={300}
                            height={450}
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

                            <p className={`${style.overview}`}>
                                <span>Sinopse</span> {movie.overview}
                            </p>
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
