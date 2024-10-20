import Link from "next/link";
import style from "./page.module.css";
import { CgSmileSad } from "react-icons/cg";

/* eslint-disable react/no-unescaped-entities */
export default function Custom404() {
    return (
        <div className={style.notFoundPage}>
            <CgSmileSad size={300} color="red" />
            <div>
                <h1>Ops! Não encontramos essa página</h1>
                <p>
                    Voltar a <Link href="/">Página inicial</Link>
                </p>
            </div>
        </div>
    );
}
