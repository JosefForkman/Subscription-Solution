import { PrenumerationType } from "@/lib/Prenumerationer"
import styles from "./overviewSection.module.css"

export default async function OverviewSection({ prenumerationer }: { prenumerationer: PrenumerationType[] }) {
    const formatCost = new Intl.NumberFormat("Sweden", { currency: "SEK", style: "currency" })

    const Quantity = prenumerationer.length
    const MonthlyCost = prenumerationer.reduce((previousValue, currentValue) => previousValue += currentValue.pris ?? 0, 0)
    const annualCost = MonthlyCost * Quantity

    return (
        <section className={`${styles.overviewSection} ${styles.gridFull} bg-white`}>
            <h2 className="h2 font-weight-bold text-accent">Sammanfattning</h2>
            <ul>
                <li>
                    <h3 className="h3">Antal prenumerationer</h3>
                    <p className="h2">{Quantity}st</p>
                </li>
                <li>
                    <h3 className="h3">Total Månadskotnad</h3>
                    <p className="h2">{formatCost.format(MonthlyCost)}</p>
                </li>
                <li>
                    <h3 className="h3">Total årskostnad</h3>
                    <p className="h2">{formatCost.format(annualCost)}</p>
                </li>
            </ul>
        </section>
    )
}