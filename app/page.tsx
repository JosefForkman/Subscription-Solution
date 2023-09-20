import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('user_service').select(`
  *, 
  service(*, category(*), price_history(*))
  `);
  return (
    <>
      <h1>Home page</h1>
      <p>{typeof(data)}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
