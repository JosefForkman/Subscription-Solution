'use client';
import Link from 'next/link';
import styles from './updateForm.module.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { nullable, z } from 'zod';
import { log } from 'console';

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

export default function UpdateForm({ data }: dataProps) {
  const searchParams = useSearchParams();

  // this and the next loop is to get rid of the string | null type from the search params
  const paramNamesNumbers = ['sentPrice', 'sentID'];
  const importedParamsNumbers: { [key: string]: number } = {};

  paramNamesNumbers.forEach((paramName) => {
    const paramValue = searchParams.get(paramName);
    importedParamsNumbers[paramName] =
      paramValue !== null ? parseInt(paramValue) : 0;
  });

  const paramNamesStrings = [
    'sentServiceName',
    'sentSignUpDate',
    'sentTermDate',
  ];
  const importedParamsStrings: { [key: string]: string } = {};

  paramNamesStrings.forEach((paramName) => {
    const paramValue = searchParams.get(paramName);
    importedParamsStrings[paramName] = paramValue !== null ? paramValue : '';
  });

  let serviceNameId = 0;
  if (data != null) {
    serviceNameId = data.findIndex(
      (obj) => obj.name == importedParamsStrings['sentServiceName']
    );
  }

  const [currentService, setCurrentService] = useState<number>(serviceNameId);
  const [price, setPrice] = useState(importedParamsNumbers['sentPrice']);
  const [sign_up_date, setSign_up_date] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formEndDateMultiplier, setFormEndDateMultiplier] = useState('1');
  const [isHidden, setIsHidden] = useState(false);
  const [isNotValidPrice, setIsNotValidPrice] = useState(true);
  const [isDiabled, setIsDiabled] = useState(true);

  const { push, refresh } = useRouter();

  const formDataSchema = z.object({
    enter_price: z.number().gt(0),
    service_id: z.number().gt(0),
    sign_up_date: z.string().optional(),
    formEndDate: z.string().optional(),
    formEndDateMultiplier: z.string().min(1).optional(),
  });

  type FormData = z.infer<typeof formDataSchema>;

  useEffect(() => {
    let formData: FormData = {
      enter_price: price,
      service_id: currentService,
      sign_up_date: importedParamsStrings['sentSignUpDate'],
      formEndDate: formEndDate,
      formEndDateMultiplier: formEndDateMultiplier,
    };
    const priceCheck = z.number().gt(0);

    if (priceCheck.safeParse(price).success) {
      setIsNotValidPrice(false);
    } else {
      setIsNotValidPrice(true);
    }
    if (formDataSchema.safeParse(formData).success) {
      setIsDiabled(false);
    } else {
      setIsDiabled(true);
    }
  }, [price, currentService, sign_up_date, formEndDate, formEndDateMultiplier]);

  const callUpdate = async (termDate: string) => {
    console.log('try fetch');
    console.log(termDate);
    try {
      const respond = await fetch(`/api/UpdateRecord`, {
        method: 'put',
        body: JSON.stringify({
          enterd_price: price,
          termination_date: termDate,
          user_service_id: importedParamsNumbers['sentID'],
        }),
      });
      console.log(respond);

      refresh();
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
      if (endDateMultiplier == 30 && endDate > 0) {
        const newEndDate = currentDate.setMonth(
          currentDate.getMonth() + endDate
        );
        callUpdate(new Date(newEndDate).toISOString());
      } else if (endDateMultiplier == 1 && endDate > 0) {
        const currentDay = currentDate.getDate();
        const midDate = new Date(currentDate);
        const newEndDate = midDate.setDate(currentDay + endDate);
        callUpdate(new Date(newEndDate).toISOString());
      } else {
        callUpdate(importedParamsStrings['sentTermDate']);
      }
    }
  };

  const retrivePrice = () => {
    if (!data) {
      return;
    }
    const i = data.findIndex((e) => e.service_id == currentService);
    setPrice(data[i].defualt_price);
  };

  //  framer motion fun zone
  const loadingContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.5,
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
        <input
          name="service"
          id="service"
          className={`${styles.basicSize} bg-white`}
          disabled
          value={importedParamsStrings['sentServiceName']}
        ></input>
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
            className={`${styles.basicSize} ${
              isNotValidPrice ? styles.isNotValid : ''
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
          type="string"
          disabled
          value={importedParamsStrings['sentSignUpDate']}
          className={`${styles.basicSize} bg-white`}
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
            className={`${styles.basicSize} `}
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
        className={`text-white ${
          !isHidden ? styles.addButton : styles.hideElement
        } ${isDiabled ? styles.isdisabled : 'bg-accent'}`}
        type="button"
        disabled={isDiabled}
        onClick={handleSubmit}
      >
        Ändra
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
