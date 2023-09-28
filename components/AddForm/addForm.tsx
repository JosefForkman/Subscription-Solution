'use client';
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
    setPrice(data[currentService - 1].defualt_price);
  };
  const [endDate, setEndDate] = useState(0);
  const [endDateMultiplier, setEndDateMultiplier] = useState(0);
  const testfunction = () => {
    const currentDate = new Date();
    if (endDateMultiplier == 30) {
      const newEndDate = currentDate.setMonth(currentDate.getMonth() + endDate);
      console.log(new Date());
      console.log(new Date(newEndDate));
    }
    if (endDateMultiplier < 30) {
      const currentDay = currentDate.getDate();
      const aaa = new Date(currentDate);
      const newEndDate = aaa.setDate(currentDay + endDate);
      console.log(new Date());
      console.log(new Date(newEndDate).toISOString());
    }
  };

  return (
    <>
        <div className={styles.subsection}>
          <label htmlFor="service">Tjänsts</label>
          <select
          name='service'
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
            name='price'
              id="price"
              type="number"
              value={price}
              onChange={(event) =>
                setPrice(Number.parseInt(event.target.value))
              }
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
          <input name='startDate' id="startDate" type="date" className={styles.basicSize} />
        </div>
        <div className={styles.subsection}>
          <label htmlFor="endDate">Uppsägningstid</label>
          <div className={styles.sideBySide}>
            <input
            name='endDate'
              id="endDate"
              type="number"
              placeholder="00"
              className={styles.basicSize}
              onChange={(event) => setEndDate(parseFloat(event.target.value))}
            />
            <select
            name='endDateMultiplier'
              id="endDateMultiplier"
              className={styles.basicSize}
              onChange={(event) =>
                setEndDateMultiplier(parseFloat(event.target.value))
              }
            >
              <option value={1}>Dagar</option>
              <option value={30}>Månader</option>
            </select>
          </div>
        </div>
    </>
  );
}
