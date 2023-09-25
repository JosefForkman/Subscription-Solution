"use client"
import { getTabs } from "@/lib/getTabs";
import styles from "./Kategori.module.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from "react-chartjs-2"
import { PrenumerationType } from "@/lib/Prenumerationer";

export default async function Kategori({prenumerationer}: {prenumerationer: PrenumerationType[]}) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  let chartData: {type: string, value: number}[] = [...prenumerationer].reduce((previousValue, currentValue) => {
      return previousValue.push({type: "Streaming", value: 1 });
  }, [{type: "Streaming", value: 0 }])

  const data: ChartData<"pie", number[], string> = {
    labels: getTabs(prenumerationer).map(val => val.name),
    datasets: [
      {
        label: 'kr',
        data: [1, 3],
        backgroundColor: [
          "#0043CA",
          "#607EBB",
          "#003399B2",
          "#00339980",
          "#0033994D",
        ],
      },
    ],
  }

  return (<section className={`bg-white ${styles.gridFull} ${styles.Pie}`}>
    <h2>Kategorier</h2>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 18L17.5 2" stroke="black" stroke-width="3" stroke-linecap="round" />
      <circle cx="4" cy="4.5" r="2.5" stroke="black" stroke-width="2" />
      <circle cx="16" cy="15.5" r="2.5" stroke="black" stroke-width="2" />
    </svg>
    <Pie data={data} options={{
      plugins: {
        legend: {
          position: "right",
          fullSize: false
        }
      }
    }} />
  </section>)
}