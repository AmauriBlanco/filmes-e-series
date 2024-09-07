"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

    const showSearch = pathname === "/filmes" || pathname === "/series";

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
        }); // Adiciona um pequeno atraso para evitar disparos a cada tecla pressionada

        return () => clearTimeout(delayDebounceFn); // Limpa o timer anterior ao digitar novamente
    }, [searchQuery]); // Executa o efeito sempre que searchQuery muda

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
                <div className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
        </header>
    );
}
