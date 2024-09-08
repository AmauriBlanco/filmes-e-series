import { useEffect, useState } from "react";
import styles from "./InputSearch.module.css";
import { usePathname, useRouter } from "next/navigation";
export default function InputSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (query: string) => {
        const searchUrl = pathname?.includes("/filmes") ? "filmes" : "series";
        if (query) {
            router.push(`/${searchUrl}?search=${encodeURIComponent(query)}`);
        } else {
            // Redireciona para a lista original quando o input estiver vazio
            router.push(`/${searchUrl}`);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchQuery);
        });

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className={styles.searchForm}>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
