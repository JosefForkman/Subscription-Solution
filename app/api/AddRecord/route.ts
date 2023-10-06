import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  'use server';
  try {
    console.log('fetch received');
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { enterd_price, service_id, sign_up_date, termination_date } =
      await request.json();
    if (user) {
      console.log('new record sent');
      console.log(enterd_price, service_id, sign_up_date, termination_date);
      await supabase.from('user_service').insert({
        enterd_price: parseInt(enterd_price),
        service_id: parseInt(service_id),
        sign_up_date: sign_up_date,
        termination_date: termination_date,
        user_id: user.id,
      });
    }
    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
