import React from 'react'
import styles from "./Footer.module.scss"
import Image from 'next/image'
import Link from 'next/link'

import FacebookIcon from "../../../public/facebook.svg"
import MailIcon from "../../../public/gmail.svg"
import Instagram from "../../../public/isntagram.svg"

function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footer_container}`}>
        <div className={`${styles.footer_container_icons}`}>
            <a href="google.com"><Image className={`${styles.footer_container_icons_face}`} src={FacebookIcon} width={90} height={90} alt=""/></a>
            <a href="google.com"><Image className={`${styles.footer_container_icons_mail}`} src={MailIcon} width={90} height={90} alt=""/></a>
            <a href="google.com"><Image className={`${styles.footer_container_icons_insta}`} src={Instagram} width={90} height={90} alt=""/></a>
        </div>
        <div className={`${styles.footer_container_logocontainer}`}>
            <div className={`${styles.footer_container_logocontainer_logo}`}></div>
            <h2>PetFinder</h2>
        </div>
        <div className={`${styles.footer_container_links}`}>
            <Link href={"google.com"}>Inicio</Link>
            <Link href={"google.com"}>Buscar mascota</Link>
            <Link href={"google.com"}>Reportar mascota</Link>
            <Link href={"google.com"}>Adoptar</Link>
            <Link href={"google.com"}>Como funciona?</Link>
        </div>
        <div className={`${styles.footer_container_footnotes}`}>
            <p>&reg; 2024 PetFinder.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
