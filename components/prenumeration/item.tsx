'use client';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './prenumeration.module.css';
import { PrenumerationType } from '@/lib/Prenumerationer';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase';

async function removeService(user_service_id: number) {
  'use server';
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { error } = await supabase.from('user_service')
}

export default function Item({
  PrenumerationItem,
}: {
  PrenumerationItem: PrenumerationType;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <li className={isOpen ? `${styles['active']} bg-white` : 'bg-white'}>
      <div onClick={() => setOpen(!isOpen)}>
        {PrenumerationItem.bild ? (
          <Image
            src={`/${PrenumerationItem.bild.toLocaleUpperCase()}`}
            width={56}
            height={56}
            alt={PrenumerationItem.bild}
          />
        ) : (
          <div className={`${styles.missingImage} bg-accent`}></div>
        )}
        <h2 className={`h2 font-weight-bold ${styles.name}`}>
          {PrenumerationItem.namn}
        </h2>
        <p className={styles.type}>{PrenumerationItem.type}</p>
        <p className={`h2 font-weight-bold ${styles.prise}`}>
          {PrenumerationItem.pris}kr
        </p>
        <span className={`h4 ${styles.priceChange}`}>
          12%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
          >
            <path
              d="M5 0.500244V11.5M5 0.500244L1 4.62524M5 0.500244L9 4.62524"
              stroke="#C30000"
            />
          </svg>
        </span>
      </div>

      <hr />

      <div className={styles.detailSection}>
        <div className={styles.body}>
          <div className={styles.spaceBetween}>
            <p>Bindningstid:</p>
            <p>{PrenumerationItem.bindningstid}</p>
          </div>
          <div className={styles.spaceBetween}>
            <p>Uppsägningstid:</p>
            <p>{PrenumerationItem.Uppsägningstid}</p>
          </div>
        </div>

        <div className={styles.spaceBetween + ' ' + styles.actionBtn}>
          <a
            href={PrenumerationItem.uppsägningsUrl}
            target="_blank"
            className="btn bg-accent h4 text-white"
            onClick={removeService(1)}
          >
            Avsluta
          </a>
          <button className="btn bg-accent h4 text-white">Historik</button>
          <button className="btn bg-accent h4 text-white">Ändra</button>
        </div>
      </div>
    </li>
  );
}
