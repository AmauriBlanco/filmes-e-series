import {
    getSerieDetails,
    getSeries,
    getRelatedSerie,
} from "../../../services/api/api";
import { Serie, SerieDetailsTypes } from "../../../services/types/types";
import Image from "next/image";
import Card from "@/app/components/Card/Card";
import style from "./style.module.css";
import HeaderSections from "@/app/components/HeaderSections/HeaderSections";
import { ImSpinner2 } from "react-icons/im";

// gerar os parâmetros estaticamente
export async function generateStaticParams() {
    const allIds = (await getSeries()).map((serie: Serie) => serie.id);
    return allIds.map((id: number) => ({ id: id.toString() }));
}

// title da página dinamico
export async function generateMetadata({ params }: { params: { id: string } }) {
    const serie = await getSerieDetails(params.id);
    return {
        title: (serie as SerieDetailsTypes).name || "Série não encontrada",
    };
}

export default async function SerieDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const serie = (await getSerieDetails(params.id)) as SerieDetailsTypes;
    const suggestedSeries = (await getRelatedSerie(params.id))?.slice(
        0,
        5
    ) as Serie[];

    const AVERAGE_GRADE = 7;

    if (!serie) {
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
                            alt={serie.name}
                            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            width={300}
                            height={450}
                            priority
                        />
                        <div className={style.detalheInfo}>
                            <div className={style.infoBottom}>
                                <h1 className={style.title}>{serie.name}</h1>
                                <p
                                    className={`${
                                        serie.vote_average < AVERAGE_GRADE
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

                            <p className={`${style.overview}`}>
                                <span>Sinopse</span> {serie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.sugestao}>
                <div className="container">
                    <HeaderSections title="Séries relacionadas" url="series" />
                    <div className={style.cardContainer}>
                        {suggestedSeries.map((serie) => (
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
