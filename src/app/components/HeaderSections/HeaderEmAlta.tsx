import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { LuArrowUpNarrowWide } from "react-icons/lu";
import style from "./HeaderEmAlta.module.css";

interface HeaderEmAltaProps {
    title: string;
    url: string;
}

const HeaderEmAlta: React.FC<HeaderEmAltaProps> = ({ title, url }) => {
    return (
        <div>
            <h2 className={style.headerTitle}>
                <div className={style.titleIcon}>
                    <LuArrowUpNarrowWide />
                    {title}
                </div>
                <Link href={`/${url}`} className={style.titleIcon}>
                    Ver mais
                    <GoPlus />
                </Link>
            </h2>
        </div>
    );
};

export default HeaderEmAlta;
