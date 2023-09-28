'use client';
import { useState } from 'react';
import styles from './formSubmitButton.module.css';
import { animate, motion, Variants } from 'framer-motion';

export default function FormSubmitButton() {
  const [isHidden, setIsHidden] = useState(false);

  const handleSubmit = () => {
    setIsHidden(!isHidden);
    console.log('button switched');
  };

  //framer motion fun zone
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
      <button
        className={`bg-accent text-white ${
          !isHidden ? styles.addButton : styles.hideElement
        }`}
        type="submit"
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
    </>
  );
}
