import styles from "./prenumeration.module.css"
import { PrenumerationType } from "@/lib/Prenumerationer";
import Image from "next/image";
import Netflix from "../../app/assets/Netflix.png";

export default function Item({ PrenumerationItem }: { PrenumerationItem: PrenumerationType }) {
    const date = `${PrenumerationItem.bindningstid.getDay()}/${PrenumerationItem.bindningstid.getMonth()}/${PrenumerationItem.bindningstid.getFullYear()}`
    return (
        <li className="bg-white" onClick={() => console.log('test click')
        }>
            <div>
                <Image src={Netflix} alt={PrenumerationItem.bild} />
                <h2>{PrenumerationItem.namn}</h2>
                <p>{PrenumerationItem.type}</p>
                <p className="h2 font-weight-bold">{PrenumerationItem.pris}</p>
            </div>
            <div className={styles.detailSection}>
                <hr />
                
                <div className={styles.spaceBetween}>
                    <p>Bindningstid:</p>
                    <p>{date}</p>
                </div>

                <div className={styles.spaceBetween}>
                    <p>Uppsägningstid:</p>
                    <p>{PrenumerationItem.Uppsägningstid}</p>
                </div>

                <div className={styles.spaceBetween + " " + styles.actionBtn}>
                    <button className="btn bg-accent text-white">Avsluta</button>
                    <button className="btn bg-accent text-white">Historik</button>
                    <button className="btn bg-accent text-white">Ändra</button>
                </div>
            </div>
        </li>
    )
}