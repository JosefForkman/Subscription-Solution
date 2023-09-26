import { tabsType } from "./Context/filter";
import { PrenumerationType } from "./Prenumerationer";

export const getTabs = (prenumerationer: PrenumerationType[]): tabsType[] => {
    const tabs = prenumerationer
        /* Make proper format of array */
        .map((value) => {
            return {
                name: value.type ?? "error",
                active: false,
            };
        })
        /* Get uniq tabs */
        .filter((value, index, array) => array
            .findIndex(indexValue => indexValue.name == value.name) === index)

            
    return tabs;
};
