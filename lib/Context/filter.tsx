import { createContext, useState } from "react";

export type filterType = "Nyheter" | "Streaming" | "Musik" | "Skola" | "Böcker" | "Annat"

export type tabsType = {
    name: filterType;
    active: boolean
}

type FilterContextType = {
    filter: tabsType[];
    setFilter: React.Dispatch<React.SetStateAction<tabsType[]>>
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider = ({ children }: { children: React.ReactElement }) => {
    const [filter, setFilter] = useState<tabsType[]>([])

    return (<FilterContext.Provider value={{ filter, setFilter }}>
        {children}
    </FilterContext.Provider>)
}