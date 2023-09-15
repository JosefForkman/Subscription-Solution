import Link from "next/link";
import style from "./GDPL.module.css";
export default function GDPL() {
    return (
        <div className={style.GDPLContiner}>
            <section className={style.GDPLSection + " " + "bg-white text-center"}>
                <div className="">
                    <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9613 6.7929C21.9417 6.58789 21.8703 6.39124 21.7537 6.22144C21.6372 6.05165 21.4794 5.91428 21.2951 5.82226L11.5852 0.950836C11.4163 0.865515 11.2297 0.820861 11.0405 0.820438C10.8512 0.820015 10.6645 0.863835 10.4952 0.948401L0.719456 5.81983C0.357753 6.00251 0.108092 6.35203 0.0569423 6.75392C0.0411102 6.87206 -1.3375 18.6171 10.4587 25.0315C10.64 25.1304 10.8436 25.1813 11.0501 25.1794C11.2567 25.1775 11.4593 25.1228 11.6388 25.0206C22.9734 18.6158 22.0076 7.27273 21.9613 6.7929ZM11.0286 22.5568C2.67412 17.6732 2.33312 9.94958 2.42689 7.69289L11.0384 3.40238L19.5609 7.67828C19.567 9.95567 18.9751 17.7171 11.0286 22.5568Z" fill="#0043CA" />
                    </svg>
                    <h1 className="h1 text-accent">GDPL</h1>
                </div>
                <p className="h2">Din integritet är vår prioritet - GDPR-säkrad app.</p>
                <p>Läs mer <Link href="#">här</Link></p>

            </section>
            <Link className={"btn bg-accent text-white text-center h1"} href="/sign-up">Fortsätt</Link>
        </div>
    )
}