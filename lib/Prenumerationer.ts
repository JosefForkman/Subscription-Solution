export type PrenumerationType = {
    type: string;
    namn: string;
    bild: string,
    pris: number;
    bindningstid: Date;
    Uppsägningstid: string;
};

export const prenumerationer: PrenumerationType[] = [
    {
        type: "Streaming",
        namn: "NETFLIX",
        bild: "Netflix.png",
        pris: 129,
        bindningstid: new Date("2023-11-24"),
        Uppsägningstid: "2 månader",
    },
    {
        type: "Streaming",
        namn: "NETFLIX",
        bild: "Netflix.png",
        pris: 129,
        bindningstid: new Date("2023-11-24"),
        Uppsägningstid: "2 månader",
    },
];
