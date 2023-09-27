import PrenumerationContent from '@/components/prenumeration/prenumerationContent';
import { getPrenumerationer } from '@/lib/Prenumerationer';
import { Database } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

export default async function Index() {
  const prenumerationer = await getPrenumerationer();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* Redirect if not login */
  if (!session) {
    redirect('/Onboarding');
  }

  return (
    <>
      <PrenumerationContent prenumerationer={prenumerationer} />
    </>
  );
}
