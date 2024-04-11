"use client"
import styles from '@/styles/pages/Home.module.scss'
import headerImg from "../../public/homeHeaderImg.png"
import { useContext } from 'react';
import { DialogContext } from '@/context/Dialog';
import Image from 'next/image';
import { Button } from '@/components/Button';
import Carousel from '@/components/Carousel/Carousel';
export default function Home() {
  const { openDialog } = useContext(DialogContext)

  return (
  <main>
     <div className={`${styles.header}`}>
      <div>
        <h1>Encuentra a tu compañero peludo perdido o adopta a un amigo fiel</h1>
        <p>Perder a una mascota es una experiencia desgarradora, pero estamos aquí para ayudarte a reunirte con tu amigo peludo o encontrar uno nuevo para llenar tu hogar de amor.</p>
        <Button onClick={openDialog}>Buscar</Button>
      </div>
      <div>
        <Image className={`${styles.header_img}`} src={headerImg} width={1028} height={888} alt="header image"/>
      </div>
     </div>
     <div className={`${styles.carouselsSections}`}>
      <Carousel />
     </div>
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
