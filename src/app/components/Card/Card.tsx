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
                width={200}
                height={320}
                priority
            />
            <div className={style.cardBody}>
                <h3 className={style.cardTitle}>{title}</h3>
                <p className={style.cardReleaseDate}>
                    Lançamento: {releaseDate}
                </p>
            </div>
        </Link>
    );
}
