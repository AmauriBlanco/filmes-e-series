"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSerieDetails, getSeries } from "../../lib/api";
import { Serie, SerieDetailsTypes } from "../../lib/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderEmAlta from "@/app/components/HeaderSections/HeaderEmAlta";
import { ImSpinner2 } from "react-icons/im";

export default function SerieDetailPage() {
    const { id } = useParams();
    const [serie, setSerie] = useState<SerieDetailsTypes | null>(null);
    const [suggestedSerie, setSuggestedSerie] = useState<Serie[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        if (id) {
            const fetchSerieDetails = async () => {
                const data = await getSerieDetails(`${id}`);
                setSerie(data);
            };
            fetchSerieDetails();
        }
    }, [id]);

    function getRandomIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        const fechtSeries = async () => {
            const data = await getSeries(getRandomIndex(500));

            const randomIndex = getRandomIndex(data.length - 5); // Gera um índice aleatório
            setSuggestedSerie(data.slice(randomIndex, randomIndex + 5)); // Pega 4 séries a partir do índice aleatório
        };
        fechtSeries();
    }, []);

    const handleToggleOverview = () => {
        setIsExpanded(!isExpanded);
    };

    if (!serie)
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
                            alt={serie.name}
                            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            width={200}
                            height={400}
                            priority
                        />
                        <div className={style.detalheInfo}>
                            <div className={style.infoBottom}>
                                <h1 className={style.title}>{serie.name}</h1>
                                <p
                                    className={`${
                                        serie.vote_average < 7
                                            ? style.average
                                            : style.aboveAverage
                                    } ${style.vote}`}
                                >
                                    {serie.vote_average.toFixed(1)}
                                </p>
                            </div>
                            <div className={style.infoBottom}>
                                <p className={style.genres}>
                                    <span>Gênero</span>{" "}
                                    {serie.genres.join(", ")}
                                </p>
                                <p className={style.release}>
                                    <span>Estreia</span>{" "}
                                    {new Intl.DateTimeFormat("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }).format(new Date(serie.first_air_date))}
                                </p>
                            </div>

                            <p
                                className={`${style.overview} ${
                                    isExpanded ? style.expanded : ""
                                }`}
                            >
                                <span>Sinopse</span> {serie.overview}
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
                    <HeaderEmAlta title="Séries relacionadas" url="series" />
                    <div className={style.cardContainer}>
                        {suggestedSerie.map((serie) => (
                            <Card
                                key={serie.id}
                                href={serie.href}
                                imgSrc={serie.imgSrc}
                                title={serie.name}
                                releaseDate={serie.first_air_date}
                                type="detalhes-serie"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
