'use client';
import Link from 'next/link';
import styles from './addForm.module.css';
import { useEffect, useState } from 'react';
import { animate, motion, Variants } from 'framer-motion';
import { redirect } from 'next/navigation';

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
  const [isHidden, setIsHidden] = useState(false);
  const [formEndDateMultiplier, setFormEndDateMultiplier] = useState('1');
  const [formEndDate, setFormEndDate] = useState('');
  const [sign_up_date, setSign_up_date] = useState('');

  const callAdd = async (termDate: string) => {
    console.log('try fetch');
    console.log(termDate);
    await fetch(`/api/AddRecord`, {
      method: 'post',
      body: JSON.stringify({
        enterd_price: price,
        service_id: currentService,
        sign_up_date: sign_up_date,
        termination_date: termDate,
      }),
    });
    redirect('/');
  };

  const handleSubmit = () => {
    setIsHidden(!isHidden);
    if (formEndDate !== null && formEndDateMultiplier !== null) {
      const endDate = parseInt(formEndDate);
      const endDateMultiplier = parseInt(formEndDateMultiplier);
      const currentDate = new Date();
      if (endDateMultiplier == 30) {
        const newEndDate = currentDate.setMonth(
          currentDate.getMonth() + endDate
        );
        callAdd(new Date(newEndDate).toISOString());
      }
      if (endDateMultiplier == 1) {
        const currentDay = currentDate.getDate();
        const midDate = new Date(currentDate);
        const newEndDate = midDate.setDate(currentDay + endDate);
        callAdd(new Date(newEndDate).toISOString());
      }
    }
  };

  const retrivePrice = () => {
    if (!data) {
      return;
    }
    setPrice(data[currentService - 1].defualt_price);
  };

  //  framer motion fun zone
  const loadingContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const loadingDotsVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <>
      <div className={styles.subsection}>
        <label htmlFor="service">Tjänsts</label>
        <select
          name="service"
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
            name="price"
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(Number.parseInt(event.target.value))}
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
        <input
          name="startDate"
          id="startDate"
          type="date"
          className={styles.basicSize}
          onChange={(event) => setSign_up_date(event.target.value)}
        />
      </div>
      <div className={styles.subsection}>
        <label htmlFor="endDate">Uppsägningstid</label>
        <div className={styles.sideBySide}>
          <input
            name="endDate"
            id="endDate"
            type="number"
            placeholder="00"
            className={styles.basicSize}
            onChange={(event) => {
              setFormEndDate(event.target.value);
            }}
          />
          <select
            name="endDateMultiplier"
            id="endDateMultiplier"
            className={styles.basicSize}
            onChange={(event) => {
              setFormEndDateMultiplier(event.target.value);
            }}
          >
            <option value={1}>Dagar</option>
            <option value={30}>Månader</option>
          </select>
        </div>
      </div>
      <button
        className={`bg-accent text-white ${
          !isHidden ? styles.addButton : styles.hideElement
        }`}
        type="button"
        onClick={handleSubmit}
      >
        Lägg till
      </button>
      <motion.div
        className={`${
          isHidden ? styles.loadingContainer : styles.hideElement
        } bg-accent text-white `}
        variants={loadingContainerVariants}
        initial={false}
        animate={isHidden ? 'show' : 'hidden'}
      >
        <motion.span
          className={styles.loadingDots}
          variants={loadingDotsVariants}
        ></motion.span>
        <motion.span
          className={styles.loadingDots}
          variants={loadingDotsVariants}
        ></motion.span>
        <motion.span
          className={styles.loadingDots}
          variants={loadingDotsVariants}
        ></motion.span>
      </motion.div>
      <Link href={'/'} className={`${styles.backButton} bg-white`}>
        Avbryt
      </Link>
    </>
  );
}
