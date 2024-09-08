"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSerieDetails, getSeries } from "../../lib/api";
import { Serie, SerieDetailsTypes } from "../../lib/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderEmAlta from "@/app/components/HeaderSections/HeaderEmAlta";

const MovieDetailsPage = () => {
    const { id } = useParams();
    console.log(useParams());
    const [serie, setSerie] = useState<SerieDetailsTypes | null>(null);
    const [suggestedSerie, setSuggestedSerie] = useState<Serie[]>([]);

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
            const data = await getSeries(getRandomIndex(500)); // Chama a função assíncrona captura a lista de series

            const randomIndex = getRandomIndex(data.length - 4); // Gera um índice aleatório
            setSuggestedSerie(data.slice(randomIndex, randomIndex + 4)); // Pega 4 séries a partir do índice aleatório
        };
        fechtSeries();
    }, []);

    if (!serie) return <div>Carregando...</div>;

    return (
        <div>
            <section className={style.detalhes}>
                <div className="container">
                    <h1>{serie.title}</h1>
                    <Image
                        alt={serie.title}
                        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                        width={200}
                        height={400}
                        priority
                    />
                    <p>Data de lançamento: {serie.release_date}</p>
                    <p>Descrição: {serie.overview}</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <HeaderEmAlta title="Filmes relacionados" url="movies" />
                    <div className={style.cardContainer}>
                        {suggestedSerie.map((serie) => (
                            <Card
                                key={serie.id}
                                href={serie.href}
                                imgSrc={serie.imgSrc}
                                title={serie.name}
                                releaseDate={serie.first_air_date}
                                type="detalhesSeries"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetailsPage;
