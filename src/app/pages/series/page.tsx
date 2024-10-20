"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getSeries } from "../../services/utils/api";
import { Serie } from "../../services/types/types";
import Card from "../../components/Card/Card";
import style from "./style.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { ImSpinner2 } from "react-icons/im";
import { CgSmileSad } from "react-icons/cg";

const SeriesClient = () => {
    const [series, setSeries] = useState<Serie[] | null>(null);
    const [page, setPage] = useState(1);
    const [filteredSeries, setFilteredSeries] = useState<Serie[]>([]);
    const [childCount, setChildCount] = useState<number>(0);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const data = await getSeries(page);
                setSeries(data);
            } catch (error) {
                console.error("Falha ao carregar:", error);
                setSeries([]);
            }
        };

        fetchSeries();
    }, [page]);

    useEffect(() => {
        if (series) {
            if (searchQuery) {
                const lowercasedQuery = searchQuery.toLowerCase();
                setFilteredSeries(
                    series.filter((serie) =>
                        serie.name.toLowerCase().includes(lowercasedQuery)
                    )
                );
            } else {
                setFilteredSeries(series);
            }
        }
    }, [searchQuery, series]);

    useEffect(() => {
        if (filteredSeries) {
            setChildCount(filteredSeries.length);
        }
    }, [filteredSeries]);

    if (series === null) {
        return (
            <div className="spinner">
                <ImSpinner2 />
            </div>
        );
    }

    return (
        <div>
            <section className={style.secaoCatalogo}>
                <div className="container">
                    <h2 className={style.sectionTitle}>Séries Populares</h2>
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
                        {filteredSeries.length > 0 ? (
                            filteredSeries.map((serie) => (
                                <Card
                                    key={serie.id}
                                    href={serie.href}
                                    imgSrc={serie.imgSrc}
                                    title={serie.name}
                                    releaseDate={serie.first_air_date}
                                    type="detalhes-serie"
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

export default SeriesClient;
