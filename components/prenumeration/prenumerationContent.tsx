"use client"
import { FilterContextProvider } from "@/lib/Context/filter";
import styles from "./prenumeration.module.css";
import { PrenumerationType, getPrenumerationer } from "@/lib/Prenumerationer";
import FilterTabs from "../filterTabs/filterTabs";
import List from "./list";

export default async function PrenumerationContent({prenumerationer}: {prenumerationer: PrenumerationType[]}) {

    const totalPrice = prenumerationer.reduce((prevues, current) => {
        if (!current.pris) {
            return 0
        }

        return prevues + current.pris
    }, 0)

    return (
        <FilterContextProvider>
            <>
                <h1 className="h1">Dina prenumerationer</h1>
                <section className={styles.info}>
                    {/* Totalt pris */}
                    <div className={`bg-white ${styles.base}`}>
                        <h2 className="h1">Totalt pris</h2>
                        <p className="h1">{totalPrice}kr</p>
                    </div>
                    {/* Lägg till prenumeration */}
                    <div className={`bg-white ${styles.base}`}>
                        <h2 className="h3">Lägg till prenumeration</h2>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M18 7.71429H10.2857V0H7.71429V7.71429H0V10.2857H7.71429V18H10.2857V10.2857H18V7.71429Z" fill="black" />
                            </svg>
                        </button>
                    </div>
                    {/* Filtrera */}
                    <div className={`bg-white ${styles.base}`}>
                        <h2 className="h3">Filtrera</h2>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                <path d="M12.1 2.29998H22V4.49998H12.1V2.29998ZM0 4.49998H7.7V6.69998H9.9V0.0999756H7.7V2.29998H0V4.49998ZM7.7 15.5H22V17.7H7.7V15.5ZM18.7 8.89997H22V11.1H18.7V8.89997ZM16.5 13.3V6.71318H14.3V8.89997H0V11.1H14.3V13.3H16.5ZM5.5 19.9V13.3H3.3V15.5H0V17.7H3.3V19.9H5.5Z" fill="black" />
                            </svg>
                        </button>
                    </div>

                    {/* Filter tabs */}
                    
                    <FilterTabs prenumerationer={prenumerationer} />
                </section>
                <List prenumerationList={prenumerationer} />

            </>
        </FilterContextProvider>
    )
}