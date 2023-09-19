"use client"
import { MouseEvent, useState } from "react";
import styles from "./filterTabs.module.css";

type tabsType = {
    name: string;
    active: boolean
}

const tabsArray: tabsType[] = [
    {
        active: false,
        name: "Musik"
    },
    {
        active: false,
        name: "Nyheter"
    },
    {
        active: false,
        name: "Streaming"
    },
    {
        active: false,
        name: "Böcker"
    },
    {
        active: false,
        name: "Annat"
    },
]

export default function FilterTabs() {
    const [tab, setTabs] = useState<tabsType[]>(tabsArray);

    const select = (e: MouseEvent<HTMLLIElement>) => {
        const { name } = e.target.parentElement.dataset

        const clickTab = tab.find(tab => tab.name == name);

        if (clickTab) {
            const tabIndex = tab.findIndex(tab => tab.name == clickTab.name)
            
            tab[tabIndex].active = !clickTab?.active

            setTabs([...tab])
        }
    }

    tab.sort((a, b) => {
        return a.active ? -1 : 1
    })

    return (
        <ul className={styles.tabs}>
            {
                tab.map((tab, index) => {
                    return (
                        <li
                            className={styles.tab}
                            onClick={select}
                            data-name={tab.name}
                            key={index}
                        >
                            <button className={tab.active ? `h4 bg-accent text-white` : "h4 bg-white text-black"}>{tab.name}</button>
                        </li>
                    )
                })
            }
        </ul >
    )
}