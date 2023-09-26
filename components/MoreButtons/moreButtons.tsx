import Image from 'next/image';
import styles from './moreButtons.module.css';

interface ButtonProps {
  img: string;
  text: string;
}

export default function MoreButtons({ img, text }: ButtonProps) {
  return (
    <>
      <button className={`${styles.moreButton} bg-white`}>
        <div className={styles.buttonImgContainer}>
          <Image className={styles.buttonImg} src={img} alt="" />
        </div>
        <p className="h3">{text}</p>
      </button>
    </>
  );
}
