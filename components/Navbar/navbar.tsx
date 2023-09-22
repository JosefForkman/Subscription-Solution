import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import homeIcon from './../../public/svg/home.svg';
import dotsIcon from './../../public/svg/dots.svg';
import overviewIcon from './../../public/svg/overview.svg';
import { useState } from 'react';

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return (
      <>
          <nav className={` bg-accent ${styles.navbar}`}>
            <Link className={`text-white ${styles.navLink}`} href={'/overview'}>
              <Image src={overviewIcon} alt="" />
            </Link>
            <Link className={`bg-white ${styles.navLink}`} href={'/'}>
              <Image src={homeIcon} alt="" />
            </Link>
            <Link className={`text-white ${styles.navLink}`} href={'/more'}>
              <Image src={dotsIcon} alt="" />
            </Link>
          </nav>
      </>
    );
  }
}
