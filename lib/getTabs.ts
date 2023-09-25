import { tabsType } from "./Context/filter";
import { PrenumerationType } from "./Prenumerationer";

export const getTabs = (prenumerationer: PrenumerationType[]): tabsType[] => {
    const tabs = prenumerationer.map(value => {
        return {
            name: value.type ?? "error",
            active: false
        }
    })

    return tabs
}