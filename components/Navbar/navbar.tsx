'use client';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import homeIcon from './../../public/svg/home.svg';
import dotsIcon from './../../public/svg/dots.svg';
import overviewIcon from './../../public/svg/overview.svg';
import { MouseEventHandler, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState(
    location.origin + usePathname()
  );

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (
    event: any
  ) => {
    setCurrentPath(event.currentTarget.href);
  };
  return (
    <>
      <nav className={` bg-accent ${styles.navbar} `}>
        <Link
          className={`text-white ${styles.navLink} ${
            currentPath == `${location.origin}/Overview` ? 'bg-white' : ''
          }`}
          href={'/Overview'}
          onClick={handleLinkClick}
        >
          <Image src={overviewIcon} alt="" />
        </Link>
        <Link
          className={`${styles.navLink} ${
            currentPath == `${location.origin}/` ? 'bg-white' : ''
          }`}
          href={'/'}
          onClick={handleLinkClick}
        >
          <Image src={homeIcon} alt="" />
        </Link>
        <Link
          className={`text-white ${styles.navLink} ${
            currentPath == `${location.origin}/More` ? 'bg-white' : ''
          }`}
          href={'/More'}
          onClick={handleLinkClick}
        >
          <Image src={dotsIcon} alt="" />
        </Link>
      </nav>
    </>
  );
}
