import Card from '../Card/card';
import styles from './carousel.module.css';
import image from './../../public/svg/onboarding.svg';
import image2 from './../../public/svg/onboarding2.svg';
import image3 from './../../public/svg/onboarding3.svg';

const images = [image, image2, image3];
const texts = [
  'Få en tydlig överblick på dina prenumerationer',
  'Hantera och jämför dina månadskostnader',
  'Skapa en sparplan för att optimera din ekonomi',
];

export default function Carousel() {
  return (
    <>
      <div>
        <div className={styles.pillContainer}>
          <div className={styles.pill}>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
          </div>
        </div>
        <div className={styles.carousel}>
          {images.map((img, index) => (
            <Card key={index} img={img} text={texts[index]}/>
          ))}
        </div>
      </div>
    </>
  );
}
