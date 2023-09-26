'use client';
import Card from '../Card/card';
import styles from './carousel.module.css';
import image from './../../public/svg/onboarding.svg';
import image2 from './../../public/svg/onboarding2.svg';
import image3 from './../../public/svg/onboarding3.svg';
import arrow from './../../public/svg/arrow.svg';
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';

const images = [image, image2, image3];
const texts = [
  'Få en tydlig överblick på dina prenumerationer',
  'Hantera och jämför dina månadskostnader',
  'Skapa en sparplan för att optimera din ekonomi',
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const onNextClick = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
          <div className={styles.pillContainer}>
            <div className={styles.pill}>
              <div
                className={`${styles.dots} ${
                  current == 0 ? 'bg-accent' : 'bg-white'
                }`}
              ></div>
              <div
                className={`${styles.dots} ${
                  current == 1 ? 'bg-accent' : 'bg-white'
                }`}
              ></div>
              <div
                className={`${styles.dots} ${
                  current == 2 ? 'bg-accent' : 'bg-white'
                }`}
              ></div>
            </div>
          </div>
          <motion.div
            className={styles.carousel}
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
          >
            {images.map((img, index) => (
              <Card key={index} img={img} text={texts[index]} />
            ))}
          </motion.div>
          <div className={styles.btnContainer}>
            <button onClick={onPrevClick} className={` ${current > 0 ? '' : 'btnHidden'}`}>
              <Image src={arrow} alt="Left button" width={30} height={30} />
            </button>
            <button onClick={onNextClick} className={`${styles.rightArrow} ${current < images.length - 1 ? '' : 'btnHidden'}`}>
              <Image src={arrow} alt="Right " width={30} height={30} />
            </button>
          </div>
        </MotionConfig>
      </div>
    </>
  );
}
