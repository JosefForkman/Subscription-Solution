import Image from 'next/image';
import styles from './card.module.css';

interface CardProps {
  img: string;
  text: string;
}

export default function Card({ img, text }: CardProps) {
  return (
    <>
      <div className={styles.card}>
        <Image src={img} alt="" width={15.9 * 16} height={15.9 * 16} />
        <p className="h2">{text}</p>
      </div>
    </>
  );
}
