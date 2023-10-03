import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
  try {
    console.log('fetch received');
    const { id } = await request.json();
    console.log(id);

    const supabase = createServerComponentClient({ cookies });
    await supabase
      .from('user_service')
      .delete()
      .match({ user_service_id: parseInt(id) });

    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
