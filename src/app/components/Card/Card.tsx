// components/Card/Card.tsx
import Link from "next/link";
import style from "./Card.module.css";
import Image from "next/image";

interface CardProps {
    href: string;
    imgSrc: string;
    title: string;
    releaseDate: string;
}

export default function Card({ href, imgSrc, title, releaseDate }: CardProps) {
    return (
        <Link href={href} className={style.card}>
            <Image
                src={imgSrc}
                alt={title}
                className={style.cardImage}
                width={220}
                height={320}
            />
            <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{title}</h3>
                <p className={style.cardReleaseDate}>Lançamento: {releaseDate}</p>
            </div>
        </Link>
    );
}
