import Link from "next/link";
import style from "./Card.module.css";
import Image from "next/image";

interface CardProps {
    href: string;
    imgSrc: string;
    title: string;
    releaseDate: string;
    type: string;
}

export default function Card({
    href,
    imgSrc,
    title,
    releaseDate,
    type,
}: CardProps) {
    return (
        <Link href={`/${type}/${href}`} className={style.card}>
            <Image
                src={imgSrc}
                alt={title}
                className={style.cardImage}
                width={220}
                height={320}
                priority
            />
            <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{title}</h3>
                <p className={style.cardReleaseDate}>
                    <span>Lançamento:</span> {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(releaseDate))}
                </p>
            </div>
        </Link>
    );
}
