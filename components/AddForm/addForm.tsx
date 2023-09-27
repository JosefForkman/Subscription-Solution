'use client';
import Link from 'next/link';
import styles from './addForm.module.css';
import { useState } from 'react';
interface dataProps {
  data:
    | {
        category_id: number | null;
        defualt_price: number;
        img_path: string | null;
        name: string;
        service_id: number;
        termination_url: string;
      }[]
    | null;
}

export default function AddForm({ data }: dataProps) {
  const [currentService, setCurrentService] = useState<number>(1);
  const [price, setPrice] = useState(0);

  const retrivePrice = () => {
    if (!data) {
      return;
    }
    console.log(data[currentService - 1].defualt_price);
    setPrice(data[currentService - 1].defualt_price);
  };

  return (
    <>
      <h1 className={styles.addH1}>Lägg till prenumeration</h1>
      <form className={styles.addForm} action="">
        <div className={styles.subsection}>
          <label htmlFor="service">Tjänsts</label>
          <select
            id="service"
            className={styles.basicSize}
            onChange={(event) =>
              setCurrentService(parseFloat(event.target.value))
            }
          >
            {data?.map((service, index) => (
              <option key={index} value={service.service_id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.subsection}>
          <label htmlFor="price">Pris</label>
          <div className={styles.sideBySide}>
            <input
              id="price"
              type="number"
              value={price}
              onChange={event => setPrice(Number.parseInt(event.target.value))}
              className={styles.basicSize}
            />
            <button
              className={`${styles.basicSize} bg-accent text-white`}
              onClick={retrivePrice}
              type="button"
            >
              Hämta pris
            </button>
          </div>
        </div>

        <div className={styles.subsection}>
          <label htmlFor="startDate">Bindningstid</label>
          <input id="startDate" type="date" className={styles.basicSize} />
        </div>
        <div className={styles.subsection}>
          <label htmlFor="endDate">Uppsägningstid</label>
          <div className={styles.sideBySide}>
            <input
              id="endDate"
              type="number"
              placeholder="00"
              className={styles.basicSize}
            />
            <select id="endDateMultiplier" className={styles.basicSize}>
              <option value={1}>Dagar</option>
              <option value={30}>Månader</option>
            </select>
          </div>
        </div>
        <button className={`${styles.addButton} bg-accent text-white`}>
          Lägg till
        </button>
        <Link href={'/'} className={`${styles.addButton} bg-white`}>
          Avbryt
        </Link>
      </form>
    </>
  );
}
