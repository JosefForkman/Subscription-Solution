import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MoreButtons from '@/components/MoreButtons/moreButtons';
import styles from './more.module.css';
import profile from './../../public/svg/profile.svg';
import household from './../../public/svg/household.svg';
import settings from './../../public/svg/settings.svg';
import termsOfService from './../../public/svg/termsOfService.svg';
import support from './../../public/svg/customerSupport.svg';
import GDPR from './../../public/svg/gdpr.svg';
import secrecy from './../../public/svg/secrecy.svg';

const icons = [
  profile,
  household,
  settings,
  termsOfService,
  support,
  GDPR,
  secrecy,
];

const texts = [
  'Profil',
  'Hushåll',
  'Inställingar',
  'Användarvillkor',
  'Kundsupport',
  'GDPR',
  'Sekretess',
];

export default async function More() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <h1 className={styles.moreH1}>Mer</h1>
      {icons.map((icon, index) => (
        <MoreButtons key={index} img={icon} text={texts[index]} />
      ))}
    </>
  );
}
