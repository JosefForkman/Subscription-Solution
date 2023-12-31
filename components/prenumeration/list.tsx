import { PrenumerationType } from "@/lib/Prenumerationer";
import Item from "./item";
import styles from "./prenumeration.module.css"
import { FilterContext, tabsType } from "@/lib/Context/filter";
import { useContext } from "react";

export default function List({ prenumerationList }: { prenumerationList: PrenumerationType[] }) {
    const filterContext = useContext(FilterContext);
    if (!filterContext) {
        return
    }
    const { filter, setFilter } = filterContext;

    

    prenumerationList = prenumerationList.filter((array_el) => {
        /* Get all active in new array */
        let newFilter = filter.filter(val => {
            return val.active == true;
        })

        if (newFilter.length == 0) {
            return true
        }

        let isActive = newFilter.findIndex((tab) => tab.name.toLocaleLowerCase() == array_el.type?.toLocaleLowerCase())

        return isActive > -1
        
    })
    
    prenumerationList = prenumerationList.sort((a, b) => {
        if (!a.namn || !b.namn) {
            return 0
        }
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