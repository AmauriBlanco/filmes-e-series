"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Importar usePathname e useRouter
import styles from "./Header.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname(); // Obter o pathname atual
    const router = useRouter(); // Obter o roteador para navegação

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Redirecionar para a página de busca com a query
        router.push(`/filmes?search=${encodeURIComponent(searchQuery)}`);
    };

    const showSearch = pathname === "/filmes" || pathname === "/series";

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.menu}>
                    <Link href="/">Filmes e Séries</Link>
                    <AiOutlineMenu
                        className={`${styles.icone} ${
                            isMenuOpen ? styles.hidden : ""
                        }`}
                        onClick={toggleMenu}
                    />
                    {/* Desktop */}
                    <nav className={styles.navDesktop}>
                        <AiOutlineClose
                            className={styles.closeIcon}
                            onClick={toggleMenu}
                        />
                        <ul>
                            <li>
                                <Link href="/filmes">Filmes</Link>
                            </li>
                            <li>
                                <Link href="/series">Séries</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile */}
                    <nav
                        className={`${styles.nav} ${
                            isMenuOpen ? styles.open : ""
                        }`}
                    >
                        <AiOutlineClose
                            className={styles.closeIcon}
                            onClick={toggleMenu}
                        />
                        <ul>
                            <li>
                                <Link href="/filmes">Filmes</Link>
                            </li>
                            <li>
                                <Link href="/series">Séries</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mostrar campo de busca apenas nas páginas /filmes e /series */}
            {showSearch && (
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            )}
        </header>
    );
}
