"use client"
import { MouseEvent, useContext, useEffect, useRef } from "react";
import styles from "./filterTabs.module.css";
import { FilterContext, tabsType } from "@/lib/Context/filter";
import { getTabs } from "@/lib/getTabs";
import { PrenumerationType } from "@/lib/Prenumerationer";


export default function FilterTabs({ prenumerationer }: { prenumerationer: PrenumerationType[] }) {
    const filterContext = useContext(FilterContext);
    if (!filterContext) { return }
    const { filter, setFilter } = filterContext;

    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => setFilter(getTabs(prenumerationer)), []);

    const select = (event: MouseEvent<HTMLLIElement>) => {
        const element = event.target as HTMLButtonElement;

        if (!element.parentElement) { return }

        const { name } = element.parentElement.dataset

        const clickTab = filter.find(tab => tab.name == name);

        if (clickTab) {
            const tabIndex = filter.findIndex(tab => tab.name == clickTab.name)

            filter[tabIndex].active = !clickTab?.active

            setFilter([...filter])
        }

        ulRef.current?.scrollTo(0, 0)
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
        <ul ref={ulRef} className={styles.tabs}>
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