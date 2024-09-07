"use client";
import Card from ".././/components/Card/Card";
import style from "./style.module.css";
import { getSeries } from ".././lib/api";
import { Serie } from ".././lib/types";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const HomePage = () => {
    const [series, setSeries] = useState<Serie[]>([]);
    const [page, setPage] = useState(1); 

    useEffect(() => {
        const fetchSeries = async () => {
            const data = await getSeries(`${page}`);
            setSeries(data);
        };

        fetchSeries();
    }, [page]);

    return (
        <div>
            <section className={style.secaoCatalogo}>
                <div className="container">
                    <h2 className={style.sectionTitle}>Filmes Populares</h2>
                    <div className={style.cardContainer}>
                        {series.map((serie) => (
                            <Card
                                key={serie.id}
                                href={serie.href}
                                imgSrc={serie.imgSrc}
                                title={serie.name}
                                releaseDate={serie.first_air_date}
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
