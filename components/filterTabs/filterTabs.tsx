import { MouseEvent, useContext, useEffect } from "react";
import styles from "./filterTabs.module.css";
import { FilterContext, tabsType } from "@/lib/Context/filter";

const tabsArray: tabsType[] = [
    {
        active: false,
        name: "Musik"
    },
    {
        active: false,
        name: "Skola"
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
    const {filter, setFilter} = useContext(FilterContext);

    useEffect(() => setFilter(tabsArray), []);
    
    const select = (e: MouseEvent<HTMLLIElement>) => {
        const { name } = e.target.parentElement.dataset

        const clickTab = filter.find(tab => tab.name == name);

        if (clickTab) {
            const tabIndex = filter.findIndex(tab => tab.name == clickTab.name)

            filter[tabIndex].active = !clickTab?.active

            setFilter([...filter])
        }
    }

    /* Make all active in first in list */
    filter.sort(a => {
        return a.active ? -1 : 1
    })

    /* Sort all active tabs */
    filter.sort((a, b) => {
        if (a.active) {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            /* Sort the list A-Z */
            return nameA < nameB ? -1 : 1
        }

        return 0
    })

    return (
        <ul className={styles.tabs}>
            {
                filter.map((tab, index) => {
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