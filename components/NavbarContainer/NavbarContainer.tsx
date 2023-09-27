import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import styles from './NavbarContainer.module.css';
import Navbar from '../Navbar/navbar';
import { Database } from '@/lib/supabase';

export default async function NavbarContainer() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return (
      <>
        <div className={styles.navContainer}>
          <Navbar />
        </div>
      </>
    );
  }
}
