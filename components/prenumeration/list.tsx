import { PrenumerationType } from "@/lib/Prenumerationer";
import Item from "./item";
import styles from "./prenumeration.module.css"

export default function List({ prenumerationList }: { prenumerationList: PrenumerationType[] }) {

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