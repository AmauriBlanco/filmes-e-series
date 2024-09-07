// src/app/movie/[id]/page.tsx
import { getMovieDetails } from "../../lib/api"; // Crie essa função para buscar detalhes do filme
import { Movie } from "../../lib/types"; // Reutilize a interface Movie, se necessário

interface MovieDetailProps {
    movie: Movie;
}

export default async function MovieDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const movie = await getMovieDetails(id);

    if (!movie) {
        return <div>Filme não encontrado</div>;
    }

    return (
        <main>
            <div className="container">
                <h1>{movie.title}</h1>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
            </div>
        </main>
    );
}
