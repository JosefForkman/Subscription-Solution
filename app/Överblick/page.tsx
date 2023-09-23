import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Överblick () {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      redirect('/login');
    }
    const { data } = await supabase.from('user_service').select(`
    *, 
    service(*, category(*), price_history(*))
    `);
}