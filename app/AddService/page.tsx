import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AddForm from '@/components/AddForm/addForm';

export default async function addService() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* Redirect if not login */
  if (!session) {
    redirect('/Onboarding');
  }

  const { data } = await supabase.from('service').select('*');

  return (
    <AddForm data={data} />
  );
}
