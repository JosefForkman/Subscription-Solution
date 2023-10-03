import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AddForm from '@/components/AddForm/addForm';
import styles from './../../components/AddForm/addForm.module.css';

async function sendBack() {
  'use server';
  redirect('/');
}

export default async function addService() {
  'use server';
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
    <>
      <h1 className={styles.addH1}>Lägg till prenumeration</h1>
      <form className={styles.addForm}>
        <AddForm data={data} />
      </form>
    </>
  );
}
