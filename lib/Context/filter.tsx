import { createContext, useState } from "react";

export type tabsType = {
    name: string;
    active: boolean
}

type FilterContextType = {
    filter: tabsType[];
    setFilter: React.Dispatch<React.SetStateAction<tabsType[]>>
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [filter, setFilter] = useState<tabsType[]>([])

    return (<FilterContext.Provider value={{ filter, setFilter }}>
        {children}
    </FilterContext.Provider>)
}