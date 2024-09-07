"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

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
        </header>
    );
}
