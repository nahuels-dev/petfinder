"use client"
import React from 'react'
import styles from "./Footer.module.scss"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from "@/assets/images/logo.png"
import FacebookIcon from "@/assets/images/facebook.svg"
import MailIcon from "@/assets/images/gmail.svg"
import Instagram from "@/assets/images/isntagram.svg"

function Footer() {
  const currentPath = usePathname();
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footer_container}`}>
        <div className={`${styles.footer_container_icons}`}>
            <a href="google.com"><Image className={`${styles.footer_container_icons_face}`} src={FacebookIcon} width={90} height={90} alt=""/></a>
            <a href="mailto:soporte@mascotasinhogar.com"><Image className={`${styles.footer_container_icons_mail}`} src={MailIcon} width={90} height={90} alt=""/></a>
            <a href="google.com"><Image className={`${styles.footer_container_icons_insta}`} src={Instagram} width={90} height={90} alt=""/></a>
        </div>
        <Link href="/">
          <div className={`${styles.footer_container_logocontainer}`}>
              <div className={`${styles.footer_container_logocontainer_logo}`}>
              <Image src={Logo} width={290} height={389} alt="logo"/>
              </div>
              <h2>Mascota Sin Hogar</h2>
          </div>  
        </Link>
        <div className={`${styles.footer_container_links}`}>
            <Link className={currentPath == "/" ? styles.active : ""} href={"google.com"}>Inicio</Link>
            <Link href={"google.com"}>Buscar mascota</Link>
            <Link href={"google.com"}>Reportar mascota</Link>
            <Link href={"google.com"}>Adoptar</Link>
            <Link href={"google.com"}>Como funciona?</Link>
        </div>
        <div className={`${styles.footer_container_footnotes}`}>
            <p>&reg; 2024 Mascota Sin Hogar.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
