import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ImSpinner2 } from "react-icons/im";


const SeriesClient = dynamic(
    () => import("../components/SeriesClient/SeriesClient"),
    {
        ssr: false, // Renderiza apenas no lado do cliente
    }
);

const SeriesPage = () => {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="spinner">
                        <ImSpinner2 />
                    </div>
                }
            >
                <SeriesClient />
            </Suspense>
        </div>
    );
};

export default SeriesPage;
