import Card from ".//components/Card/Card";
import style from "./page.module.css";
import { getMovies, getSeries } from "./lib/api";
import { Movie, Serie } from "./lib/types";
import HeaderSections from "./components/HeaderSections/HeaderSections";

const HomePage = async () => {
    const movies: Movie[] = await getMovies();
    const series: Serie[] = await getSeries();
    const limitedMovies = movies.slice(0, 5);
    const limitedSeries = series.slice(0, 5);

    return (
        <div>
            <section className={style.secaoCatalogo}>
                <div className="container">
                    <HeaderSections title="Filmes" url="filmes" />
                    <div className={style.cardContainer}>
                        {limitedMovies.map((movie) => (
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

            <section className={style.secaoCatalogo}>
                <div className="container">
                    <HeaderSections title="Series" url="series" />
                    <div className={style.cardContainer}>
                        {limitedSeries.map((serie) => (
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
};

export default HomePage;
