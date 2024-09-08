import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                Site Desenvolvido por 
                <a
                    href="https://www.linkedin.com/in/amauriblanco/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                     Amauri Blanco
                </a>
            </p>
        </footer>
    );
}
