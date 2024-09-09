import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ImSpinner2 } from "react-icons/im";


const MoviesClient = dynamic(
    () => import("../components/MoviesClient/MoviesClient"),
    {
        ssr: false, // Renderiza apenas no lado do cliente
    }
);

const FilmesPage = () => {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="spinner">
                        <ImSpinner2 />
                    </div>
                }
            >
                <MoviesClient />
            </Suspense>
        </div>
    );
};

export default FilmesPage;
