import styles from '@/styles/pages/Home.module.scss'
import FindYourPet from '@/components/FindYourPetModal/FindYourPet';
import headerImg from "../../public/homeHeaderImg.png"

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <FindYourPet />
     <div className={`${styles.header}`}>
      <div>
        <h1>Encuentra a tu compañero peludo perdido o adopta a un amigo fiel</h1>
        <p>Perder a una mascota es una experiencia desgarradora, pero estamos aquí para ayudarte a reunirte con tu amigo peludo o encontrar uno nuevo para llenar tu hogar de amor.</p>
        <Link className={`${styles.header_cta}`} href="google.com">Buscar</Link>
      </div>
      <div>
        <Image className={`${styles.header_img}`} src={headerImg} width={1028} height={888} alt="header image"/>
      </div>
     </div>
     <div className={`${styles.carouselsSections}`}>
     </div>
    </main>
  );
}
