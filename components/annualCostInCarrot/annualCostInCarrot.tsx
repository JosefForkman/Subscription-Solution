import { PrenumerationType } from "@/lib/Prenumerationer";
import styles from "./annualCostInCarrot.module.css"

export default async function AnnualCostInCarrot({ prenumerationer }: { prenumerationer: PrenumerationType[] }) {

    const Quantity = prenumerationer.length
    const MonthlyCost = prenumerationer.reduce((previousValue, currentValue) => previousValue += currentValue.pris ?? 0, 0)
    const carrotPrice = 29.95
    const price = (((MonthlyCost * 12) * Quantity) / carrotPrice).toFixed(0)

    return (
        <section className={`${styles.månadskostnad} ${styles.smallCardGrid} bg-white`}>
            <h2 className="h3">Månadskostnad i morötter</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5.75 4.46374C4.7875 5.23375 4.0217 6.18329 3.4526 7.3124C2.8835 8.44149 2.5993 9.67069 2.6 11C2.6 13.0125 3.2125 14.767 4.4375 16.2636C5.6625 17.7602 7.21125 18.7269 9.08375 19.1637C9.34625 19.2337 9.55625 19.387 9.71375 19.6236C9.87125 19.8602 9.95 20.1182 9.95 20.3975C9.95 20.6775 9.85375 20.9137 9.66125 21.1062C9.46875 21.2987 9.25 21.3687 9.005 21.3162C6.555 20.8612 4.525 19.6758 2.915 17.7599C1.305 15.844 0.5 13.5907 0.5 11C0.5 9.40749 0.81955 7.9375 1.45865 6.59C2.09775 5.2425 2.9682 4.08749 4.07 3.12499H2.6C2.3025 3.12499 2.05295 3.02419 1.85135 2.82259C1.64975 2.62099 1.5493 2.3718 1.55 2.075C1.55 1.7775 1.6508 1.52795 1.8524 1.32635C2.054 1.12475 2.3032 1.0243 2.6 1.025H6.8C7.0975 1.025 7.34705 1.1258 7.54865 1.3274C7.75025 1.529 7.8507 1.7782 7.85 2.075V6.27499C7.85 6.57249 7.7492 6.82205 7.5476 7.02365C7.346 7.22525 7.0968 7.3257 6.8 7.325C6.5025 7.325 6.25295 7.2242 6.05135 7.02259C5.84975 6.82099 5.7493 6.57179 5.75 6.27499V4.46374ZM17.93 18.875H19.4C19.6975 18.875 19.947 18.9758 20.1486 19.1774C20.3502 19.379 20.4507 19.6282 20.45 19.925C20.45 20.2225 20.3492 20.472 20.1476 20.6736C19.946 20.8752 19.6968 20.9757 19.4 20.975H15.2C14.9025 20.975 14.6529 20.8742 14.4513 20.6726C14.2497 20.471 14.1493 20.2218 14.15 19.925V15.725C14.15 15.4275 14.2508 15.1779 14.4524 14.9763C14.654 14.7747 14.9032 14.6743 15.2 14.675C15.4975 14.675 15.747 14.7758 15.9486 14.9774C16.1502 15.179 16.2507 15.4282 16.25 15.725V17.5362C17.2125 16.7487 17.9783 15.795 18.5474 14.675C19.1165 13.555 19.4007 12.33 19.4 11C19.4 8.98749 18.7875 7.23294 17.5625 5.73635C16.3375 4.23975 14.7887 3.27304 12.9162 2.83624C12.6537 2.76624 12.4437 2.6133 12.2863 2.3774C12.1287 2.1415 12.05 1.8832 12.05 1.6025C12.05 1.3225 12.1462 1.08625 12.3387 0.893745C12.5312 0.701245 12.75 0.631245 12.995 0.683745C15.445 1.13875 17.475 2.32455 19.085 4.24115C20.695 6.15774 21.5 8.41069 21.5 11C21.5 12.5925 21.1804 14.0625 20.5413 15.41C19.9022 16.7575 19.0318 17.9125 17.93 18.875Z" fill="black" />
            </svg>
            <p className="h1">{price}kg</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M52.9999 12H48.2499L53.1274 7.1225C53.4065 6.84344 53.6278 6.51215 53.7789 6.14754C53.9299 5.78293 54.0076 5.39215 54.0076 4.9975C54.0076 4.60285 53.9299 4.21207 53.7789 3.84746C53.6278 3.48285 53.4065 3.15156 53.1274 2.8725C52.8483 2.59344 52.5171 2.37208 52.1524 2.22105C51.7878 2.07003 51.3971 1.9923 51.0024 1.9923C50.6078 1.9923 50.217 2.07003 49.8524 2.22105C49.4878 2.37208 49.1565 2.59344 48.8774 2.8725L43.9999 7.75V3C43.9999 2.20435 43.6838 1.44129 43.1212 0.87868C42.5586 0.316071 41.7956 0 40.9999 0C40.2043 0 39.4412 0.316071 38.8786 0.87868C38.316 1.44129 37.9999 2.20435 37.9999 3V9.5C34.8551 8.08193 31.3533 7.65416 27.9597 8.2735C24.566 8.89285 21.441 10.53 18.9999 12.9675C8.86241 22.92 1.29491 46.25 0.444906 48.9425C0.101152 49.7039 -0.046364 50.5392 0.0158317 51.3723C0.0780275 52.2053 0.347953 53.0095 0.800952 53.7114C1.25395 54.4133 1.87559 54.9904 2.60908 55.3902C3.34257 55.79 4.16454 55.9997 4.99991 56C5.71029 55.9988 6.41237 55.8471 7.05991 55.555C8.96991 54.95 21.2574 50.97 31.7874 45.1L31.9224 45.025C36.1974 42.6325 40.1724 39.9275 43.0324 37.025C45.4751 34.5818 47.1154 31.4524 47.7349 28.0536C48.3544 24.6548 47.9236 21.1479 46.4999 18H52.9999C53.7956 18 54.5586 17.6839 55.1212 17.1213C55.6838 16.5587 55.9999 15.7956 55.9999 15C55.9999 14.2044 55.6838 13.4413 55.1212 12.8787C54.5586 12.3161 53.7956 12 52.9999 12ZM38.7774 32.78L38.7549 32.8025C36.7274 34.8725 33.9774 36.8525 30.9224 38.6825L25.1199 32.88C24.5563 32.3164 23.7919 31.9998 22.9949 31.9998C22.1979 31.9998 21.4335 32.3164 20.8699 32.88C20.3063 33.4436 19.9897 34.208 19.9897 35.005C19.9897 35.802 20.3063 36.5664 20.8699 37.13L25.4249 41.685C17.8524 45.4775 9.89241 48.29 6.60991 49.39C8.30241 44.335 14.0574 28.19 21.1949 19.455L28.8699 27.13C29.4335 27.6936 30.1979 28.0102 30.9949 28.0102C31.7919 28.0102 32.5563 27.6936 33.1199 27.13C33.6835 26.5664 34.0001 25.802 34.0001 25.005C34.0001 24.208 33.6835 23.4436 33.1199 22.88L25.6349 15.395C27.9535 14.0974 30.6634 13.6828 33.2639 14.2279C35.8644 14.773 38.1797 16.2409 39.782 18.3604C41.3843 20.4799 42.1652 23.1078 41.9806 25.7584C41.7959 28.409 40.6581 30.9031 38.7774 32.78Z" fill="#0043CA" />
            </svg>
        </section>
    )
}