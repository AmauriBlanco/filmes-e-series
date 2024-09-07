// app/page.tsx
import Card from ".././/components/Card/Card";
import style from "./style.module.css";
import { getSeries } from ".././lib/api";
import { Serie } from ".././lib/types";

const HomePage = async () => {
    const series: Serie[] = await getSeries();
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
                </div>
            </section>
        </div>
    );
};

export default HomePage;
