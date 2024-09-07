"use client";
import Card from ".././/components/Card/Card";
import style from "./style.module.css";
import { getSeries } from ".././lib/api";
import { Serie } from ".././lib/types";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";

const HomePage = () => {
    const [series, setSeries] = useState<Serie[]>([]);
    const [page, setPage] = useState(1);
    const [filteredSeries, setFilteredSeries] = useState<Serie[]>([]);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        const fetchSeries = async () => {
            const data = await getSeries(page);
            setSeries(data);
        };

        fetchSeries();
    }, [page]);

    useEffect(() => {
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
    }, [searchQuery, series]);

    return (
        <div>
            <section className={style.secaoCatalogo}>
                <div className="container">
                    <h2 className={style.sectionTitle}>Filmes Populares</h2>
                    <div className={style.cardContainer}>
                        {filteredSeries.map((serie) => (
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

                    <Pagination page={page} setPage={setPage} />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
