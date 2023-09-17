import { PrenumerationType } from "@/lib/Prenumerationer";
import Item from "./item";
import styles from "./prenumeration.module.css"

export default function List({ prenumerationList }: { prenumerationList: PrenumerationType[] }) {
    prenumerationList = prenumerationList.sort((a, b) => {
        const nameA = a.namn.toLowerCase();
        const nameB = b.namn.toLowerCase();

        /* Sort the list A-Z */
        return nameA < nameB ? -1 : 1
    })

    return (
        <section className={styles.prenumeration}>
            <ul>
                {
                    prenumerationList.map((item, index) => {
                        return <Item key={index} PrenumerationItem={item} />
                    })
                }
            </ul>
        </section>)
}