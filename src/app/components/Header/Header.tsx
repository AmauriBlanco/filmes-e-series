"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import InputSearch from "../InputSearch/InputSearch";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const showSearch = pathname === "/filmes/" || pathname === "/series/";

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.menu}>
                    <Link href="/">SalaryFlix</Link>
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
                                {/* Mostrar campo de busca apenas nas páginas /filmes e /series */}
                                {showSearch && <InputSearch />}
                            </li>
                            <li>
                                <Link
                                    href="/filmes"
                                    className={styles.linkHeader}
                                >
                                    Filmes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/series"
                                    className={styles.linkHeader}
                                >
                                    Séries
                                </Link>
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
                                <Link onClick={toggleMenu} href="/filmes">Filmes</Link>
                            </li>
                            <li>
                                <Link onClick={toggleMenu} href="/series">Séries</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.backdrop}></div>
                </div>
            </div>
        </header>
    );
}
