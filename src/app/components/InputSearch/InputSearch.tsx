"use client";
import { useEffect, useState } from "react";
import styles from "./InputSearch.module.css";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function InputSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (query: string) => {
        const searchUrl = pathname?.includes("filmes/") ? "filmes/" : "series/";
        if (query) {
            router.push(`?search=${encodeURIComponent(query)}`);
        } else {
            // Redireciona para a lista original quando o input estiver vazio
             router.push(`/${searchUrl}`);
        }
    };

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    return (
        <form className={styles.searchForm}>
            <label htmlFor="seacrh">
                <FaSearch />
            </label>
            <input
                id="search"
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    );
}
