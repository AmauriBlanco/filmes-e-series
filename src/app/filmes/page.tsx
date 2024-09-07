// app/page.tsx
import Card from ".././/components/Card/Card";
import style from "./style.module.css";
import { getMovies } from ".././lib/api";
import { Movie } from ".././lib/types";

const HomePage = async () => {
    const movies: Movie[] = await getMovies();
    return (
        <div>
            <section className={style.secaoCatalogo}>
                <div className="container">
                    <h2 className={style.sectionTitle}>Filmes Populares</h2>
                    <div className={style.cardContainer}>
                        {movies.map((movie) => (
                            <Card
                                key={movie.id}
                                href={movie.href}
                                imgSrc={movie.imgSrc}
                                title={movie.title}
                                releaseDate={movie.release_date}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
