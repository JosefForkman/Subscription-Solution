import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AddForm from '@/components/AddForm/addForm';
import styles from './../../components/AddForm/addForm.module.css';
import Link from 'next/link';
import FormSubmitButton from '@/components/FormSubmitButton/formSubmitButton';

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

  const addService = async (formData: FormData) => {
    'use server';
    const supabase = createServerComponentClient<Database>({ cookies });
    const service_id = formData.get('service') as string;
    const enterd_price = formData.get('price') as string;
    const sign_up_date = formData.get('startDate') as string;
    const formEndDate = formData.get('endDate') as string;
    const formEndDateMultiplier = formData.get('endDateMultiplier') as string;
    let termination_date: string | undefined = '';

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      if (formEndDate !== null && formEndDateMultiplier !== null) {
        const endDate = parseInt(formEndDate);
        const endDateMultiplier = parseInt(formEndDateMultiplier);
        const currentDate = new Date();
        if (endDateMultiplier == 30) {
          const newEndDate = currentDate.setMonth(
            currentDate.getMonth() + endDate
          );
          termination_date = new Date(newEndDate).toISOString();
        }
        if (endDateMultiplier < 30) {
          const currentDay = currentDate.getDate();
          const midDate = new Date(currentDate);
          const newEndDate = midDate.setDate(currentDay + endDate);
          termination_date = new Date(newEndDate).toISOString();
        }
      }

      const { error } = await supabase.from('user_service').insert({
        enterd_price: parseInt(enterd_price),
        service_id: parseInt(service_id),
        sign_up_date: sign_up_date,
        termination_date: termination_date,
        user_id: user.id,
      });
      redirect('/');
    }
  };

  return (
    <>
      <h1 className={styles.addH1}>Lägg till prenumeration</h1>
      <form className={styles.addForm} action={addService}>
        <AddForm data={data} />
        <FormSubmitButton />
        <Link href={'/'} className={`${styles.backButton} bg-white`}>
          Avbryt
        </Link>
      </form>
    </>
  );
}
