import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { filterType } from "./Context/filter";
import { Database } from "./supabase";
import { cookies } from "next/headers";

export type PrenumerationType = {
    type: string | undefined;
    namn?: string;
    bild?: string | null;
    pris?: number;
    bindningstid: string;
    Uppsägningstid: string;
    uppsägningsUrl?: string;
    historia:
        | {
              pris: number;
              datum: string;
          }[]
        | undefined;
};

export const getPrenumerationer = async () => {
    const supabase = createClientComponentClient<Database>();

    try {
        const { data } = await supabase
            .from("user_service")
            .select(`*, service(*, category(*), price_history(*))`);

        if (!data) {
            return [];
        }

        let prenumeration: PrenumerationType[] = data.map((user_service) => {
            return {
                type: user_service.service?.category?.type,
                namn: user_service.service?.name,
                bild: user_service.service?.img_path,
                pris: user_service.service?.defualt_price,
                bindningstid: user_service.sign_up_date,
                Uppsägningstid: user_service.termination_date,
                uppsägningsUrl: user_service.service?.termination_url,
                historia: user_service.service?.price_history.map((history) => {
                    return {
                        pris: history.price,
                        datum: history.date,
                    };
                }),
            };
        });

        return prenumeration;
    } catch (error) {
        throw new Error("server error when get data from DB");
    }
};

// export const prenumerationer: PrenumerationType[] = [
//     {
//         type: "Streaming",
//         namn: "NETFLIX",
//         bild: null,
//         pris: 129,
//         bindningstid: "2023-11-24",
//         Uppsägningstid: "2 månader",
//         uppsägningsUrl: "",
//         historia: [
//             {
//                 pris: 129,
//                 datum: "2023-10-24"
//             },
//             {
//                 pris: 95,
//                 datum: "2019-01-1"
//             }
//         ],
//     },
//     {
//         type: "Skola",
//         namn: "ADOBE",
//         bild: "ADOBE.png",
//         pris: 129,
//         bindningstid: "2023-11-24",
//         Uppsägningstid: "2 månader",
//         uppsägningsUrl: "",
//         historia: [],
//     },
//     {
//         type: "Nyheter",
//         namn: "Aftonbladet",
//         bild: "AFTONBLADET.png",
//         pris: 129,
//         bindningstid: "2023-11-24",
//         Uppsägningstid: "2 månader",
//         uppsägningsUrl: "",
//         historia: [],
//     },
//     {
//         type: "Streaming",
//         namn: "Disney+",
//         bild: "DISNEY+.png",
//         pris: 129,
//         bindningstid: "2023-11-24",
//         Uppsägningstid: "2 månader",
//         uppsägningsUrl: "",
//         historia: [],
//     },
//     {
//         type: "Böcker",
//         namn: "Storytel",
//         bild: "STORYTEL.png",
//         pris: 129,
//         bindningstid: "2023-11-24",
//         Uppsägningstid: "2 månader",
//         uppsägningsUrl: "",
//         historia: [],
//     },
// ];
