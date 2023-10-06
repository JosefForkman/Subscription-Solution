'use client';

import styles from './prenumeration.module.css';
import { PrenumerationType } from '@/lib/Prenumerationer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Item({
  PrenumerationItem,
}: {
  PrenumerationItem: PrenumerationType;
}) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const callDelete = async () => {
    console.log('try fetch');
    await fetch(`/api/DeleteRecord`, {
      method: 'delete',
      body: JSON.stringify({ id: PrenumerationItem.user_service_id }),
    });
    setOpen(!isOpen);
    router.refresh();
  };

  return (
    <li className={isOpen ? `${styles['active']} bg-white` : 'bg-white'}>
      <div onClick={() => setOpen(!isOpen)}>
        {PrenumerationItem.bild ? (
          <Image
            src={`/${PrenumerationItem.bild}`}
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
          <button
            // href={`${PrenumerationItem.uppsägningsUrl}`}
            // target="_blank"
            className="btn bg-accent h4 text-white"
            onClick={callDelete}
          >
            Avsluta
          </button>
          <button className="btn bg-accent h4 text-white">Historik</button>
          <Link
            href={{
              pathname: '/UpdateService',
              query: {
                sentID: PrenumerationItem.user_service_id,
                sentPrice: PrenumerationItem.pris,
                sentServiceName: PrenumerationItem.namn,
                sentSignUpDate: PrenumerationItem.bindningstid,
                sentTermDate: PrenumerationItem.Uppsägningstid,
              },
            }}
            className="btn bg-accent h4 text-white"
          >
            Ändra
          </Link>
        </div>
      </div>
    </li>
  );
}
