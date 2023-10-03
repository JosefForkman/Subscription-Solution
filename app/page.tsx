import PrenumerationContent from '@/components/prenumeration/prenumerationContent';
import { PrenumerationType, getPrenumerationer } from '@/lib/Prenumerationer';
import { Database } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

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
      
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <PrenumerationContent prenumerationer={prenumerationer} user={user} />
    </>
  );
}
