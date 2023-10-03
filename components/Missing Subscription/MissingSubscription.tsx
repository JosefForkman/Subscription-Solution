import styles from "./missingSubscription.module.css";
import Link from "next/link";

export default function MissingSubscription() {

    return (
        <section className={`bg-white ${styles.MissingSubscription}`}>
            <p className="h4">Det verkar inte som du har lagt in några prenumerationer än.</p>
            <div>
                <h2 className="h3">Lägg till prenumeration</h2>
                <Link href="/AddService">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                    >
                        <path
                            d="M18 7.71429H10.2857V0H7.71429V7.71429H0V10.2857H7.71429V18H10.2857V10.2857H18V7.71429Z"
                            fill="black"
                        />
                    </svg>
                </Link>
            </div>
        </section>
    )
}