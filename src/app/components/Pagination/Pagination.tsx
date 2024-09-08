import style from "./Pagination.module.css";
interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
}
export default function Pagination({ page, setPage }: PaginationProps) {
    const handleNextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
        window.scrollTo(0, 0);
    };
    return (
        <div className={style.pagination}>
            <button onClick={handlePrevPage} disabled={page <= 1}>
                Anterior
            </button>
            <span>Página {page}</span>
            <button onClick={handleNextPage}>Próxima</button>
        </div>
    );
}
