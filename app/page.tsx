import PrenumerationContent from '@/components/prenumeration/prenumerationContent';
import { getPrenumerationer } from '@/lib/Prenumerationer';
import { Database } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const prenumerationer = await getPrenumerationer();

  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { user } } = await supabase.auth.getUser()


  return <PrenumerationContent prenumerationer={prenumerationer} user={user} />
}
