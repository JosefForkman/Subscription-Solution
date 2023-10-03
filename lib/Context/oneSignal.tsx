"use client"
import { createContext, useState } from "react";

type OneSignalContextType = {
    oneSignalInitialized: boolean;
    setOneSignalInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

export const OneSignalContext = createContext<OneSignalContextType | null>(null);

export const OneSignalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [oneSignalInitialized, setOneSignalInitialized] = useState(false)

    return (<OneSignalContext.Provider value={{ oneSignalInitialized, setOneSignalInitialized }}>
        {children}
    </OneSignalContext.Provider>)
}