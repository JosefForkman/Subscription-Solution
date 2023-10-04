'use client';
import Link from 'next/link';
import styles from './addForm.module.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

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
  const [currentService, setCurrentService] = useState<number>(0);
  const [price, setPrice] = useState(0);
  const [sign_up_date, setSign_up_date] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formEndDateMultiplier, setFormEndDateMultiplier] = useState('1');
  const [isHidden, setIsHidden] = useState(false);
  const [isNotValidService, setIsNotValidservice] = useState(false);
  const [isNotValidPrice, setIsNotValidPrice] = useState(false);
  const [isNotValidSignUpDate, setIsNotValidSignUpDate] = useState(false);
  const [isNotValidEndDate, setIsNotValidEndDate] = useState(false);
  const [isDiabled, setIsDiabled] = useState(true);

  const { push, refresh } = useRouter();

  const formDataSchema = z.object({
    enter_price: z.number().gt(0),
    service_id: z.number().gt(0),
    sign_up_date: z.string().min(1),
    formEndDate: z.string().min(1),
    formEndDateMultiplier: z.string().min(1),
  });

  type FormData = z.infer<typeof formDataSchema>;

  useEffect(() => {
    let formData = {
      enter_price: price,
      service_id: currentService,
      sign_up_date: sign_up_date,
      formEndDate: formEndDate,
      formEndDateMultiplier: formEndDateMultiplier,
    };
    const priceCheck = z.number().gt(0);
    const serviceCheck = z.number().gt(0);
    const signUpCheck = z.string().min(1);
    const formEndCheck = z.string().min(1);
    const formEndMultiCheck = z.string().min(1);

    if (serviceCheck.safeParse(currentService).success) {
      setIsNotValidservice(false);
    }
    if (priceCheck.safeParse(price).success) {
      setIsNotValidPrice(false);
    }
    if (signUpCheck.safeParse(sign_up_date).success) {
      setIsNotValidSignUpDate(false);
    }
    if (formEndCheck.safeParse(formEndDate).success) {
      setIsNotValidEndDate(false);
    }
    if (formDataSchema.safeParse(formData).success) {
      setIsDiabled(false);
    }


    // console.log(formDataSchema.safeParse(formData).success);
  }, [price, currentService, sign_up_date, formEndDate, formEndDateMultiplier]);

  const callAdd = async (termDate: string) => {
    console.log('try fetch');
    console.log(termDate);
    try {
      const respond = await fetch(`/api/AddRecord`, {
        method: 'post',
        body: JSON.stringify({
          enterd_price: price,
          service_id: currentService,
          sign_up_date: sign_up_date,
          termination_date: termDate,
        }),
      });
      console.log(respond);
      
      refresh()
      push('/');
    } catch (error) {
      setIsDiabled(true);
    }
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
          className={`${styles.basicSize} ${isNotValidService ? styles.isNotValid : ''
            }`}
          onChange={(event) =>
            setCurrentService(parseFloat(event.target.value))
          }
        >
          `<option value={0} style={{ display: 'none' }}></option>`
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
            className={`${styles.basicSize} ${isNotValidPrice ? styles.isNotValid : ''
              }`}
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
          className={`${styles.basicSize} ${isNotValidSignUpDate ? styles.isNotValid : ''
            }`}
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
            className={`${styles.basicSize} ${isNotValidEndDate ? styles.isNotValid : ''
              }`}
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
        className={`bg-accent text-white ${!isHidden ? styles.addButton : styles.hideElement
          }`}
        type="button"
        disabled={isDiabled}
        onClick={handleSubmit}
      >
        Lägg till
      </button>
      <motion.div
        className={`${isHidden ? styles.loadingContainer : styles.hideElement
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
