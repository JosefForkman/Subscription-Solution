"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2"

export default async function Kategori() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Streaming', 'Musik', 'Nyheter', 'Böcker', 'Övrigt'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
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

    return (<section className="bg-white">
        <Pie data={data} />
    </section>)
}