import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import styles from './onboarding.module.css';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Carusel from '@/components/Carousel/carousel';

export default async function Onboarding() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect('/');
  }
  return (
    <>
      <Carusel />
      <div className={styles.buttonContainer}>
        <Link
          href={'/GDPL'}
          className={` btn bg-accent text-white h1 ${styles.linkBtn}`}
        >
          <p>Skapa Konto</p>
        </Link>
        <Link href={'/login'} className={` btn bg-white h1 ${styles.linkBtn}`}>
          <p>Logga in</p>
        </Link>
      </div>
    </>
  );
}
