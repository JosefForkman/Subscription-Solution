import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
  'use server';
  try {
    console.log('fetch received');
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { enterd_price, termination_date, user_service_id } =
      await request.json();
    if (user) {
      console.log('new record sent');
      console.log(enterd_price, termination_date, user_service_id);
      await supabase
        .from('user_service')
        .update({
          enterd_price: parseInt(enterd_price),
          termination_date: termination_date,
        })
        .match({ user_service_id });
    }
    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
