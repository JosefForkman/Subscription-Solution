import PrenumerationContent from '@/components/prenumeration/prenumerationContent';
import { PrenumerationType } from '@/lib/Prenumerationer';
import { Database } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
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

  if (!data) {
    return;
  }
  let prenumeration: PrenumerationType[] = data.map(user_service => {
    return {
      type: user_service.service?.category?.type,
      namn: user_service.service?.name,
      bild: user_service.service?.img_path,
      pris: user_service.service?.defualt_price,
      bindningstid: user_service.sign_up_date,
      Uppsägningstid: user_service.termination_date,
      uppsägningsUrl: user_service.service?.termination_url,
      historia: user_service.service?.price_history.map(history => {
        return {
          pris: history.price,
          datum: history.date
        }
      })
    }
  })

  return (
    <>
      <PrenumerationContent prenumerationer={prenumeration} />
      {/* <p>{typeof data}</p> */}
    </>
  );
}
