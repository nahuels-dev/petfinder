"use client"
import styles from '@/styles/pages/Home.module.scss'
import headerImg from "../../public/homeHeaderImg.png"
import huellaImg from "../../public/huella.png"
import { useContext } from 'react';
import { DialogContext } from '@/context/Dialog';
import Image from 'next/image';
import { Button } from '@/components/Button';
import {Carousel} from '@/components/Carousel/Carousel';
import Link from 'next/link';
import GridBlogLinks from '@/components/GridBlogLinks/GridBlogLinks';
import LoginForm from '@/components/LogForm/LoginForm';
export default function Home() {
  const { openDialog } = useContext(DialogContext)

  return (
  <main>
     <header className={`${styles.header}`}>
      <div className={`${styles.header__text}`}>
        <h1>Encuentra a tu compañero peludo perdido o adopta a un amigo fiel</h1>
        <p>Perder a una mascota es una experiencia desgarradora, pero estamos aquí para ayudarte a reunirte con tu amigo peludo o encontrar uno nuevo para llenar tu hogar de amor.</p>
        <Button onClick={openDialog}>Buscar</Button>
      </div>
      <div>
        <Image className={`${styles.header_img}`} src={headerImg} width={1028} height={888} alt="header image"/>
      </div>
     </header>
     <div className={`${styles.carouselsSections}`}>
      <Image className={`${styles.carouselHuella}`} src={huellaImg} width={301} height={299} alt="huella image"></Image>
      <Carousel tipo={`Busqueda`} titulo={`Viste alguno de estos?`}/>
      <Link href="google.com" className={`${styles.carouselsSections__viewAll}`}>Ver todos</Link>
     </div>
     <div className={`${styles.carouselsSections}`}>
      <Image className={`${styles.carouselHuella}`} src={huellaImg} width={301} height={299} alt="huella image"></Image>
      <Carousel tipo={`Pertenece`} titulo={`Alguno te pertenece?`} />
      <Link href="google.com" className={`${styles.carouselsSections__viewAll}`}>Ver todos</Link>
     </div>
     <div className={`${styles.gridBlogLinks}`}>
      <GridBlogLinks />
     </div>
     <LoginForm />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
    </main>
  );
}
