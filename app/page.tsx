import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
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
  return (
    <>
      <h1>Home page</h1>
      <p>{typeof data}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
