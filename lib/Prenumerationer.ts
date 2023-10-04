import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./supabase";
import { cookies } from "next/headers";
import { cache } from "react";

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
    user_service_id: number;
};

// export const revalidate = 1000

export const getPrenumerationer = cache(async () => {
    const supabase = createServerComponentClient<Database>({ cookies });

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
                pris:
                    user_service.enterd_price ??
                    user_service.service?.defualt_price,
                bindningstid: user_service.sign_up_date,
                Uppsägningstid: user_service.termination_date,
                uppsägningsUrl: user_service.service?.termination_url,
                historia: user_service.service?.price_history.map((history) => {
                    return {
                        pris: history.price,
                        datum: history.date,
                    };
                }),
                user_service_id: user_service.user_service_id,
            };
        });

        return prenumeration;
    } catch (error) {
        throw new Error("server error when get data from DB");
    }
});