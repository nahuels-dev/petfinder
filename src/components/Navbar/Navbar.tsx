"use client"
import React, { useState,useEffect,useRef } from 'react'
import styles from "./Navbar.module.scss";
import Link from 'next/link';
import { Button } from '../Button';
import Image from 'next/image';

import Logo from "@/../public/logo.png"

import { usePathname } from 'next/navigation'

function Navbar() {
  const currentPath = usePathname();
  const [isActive, setIsActive] = useState(false);
  const header = useRef<HTMLElement>(null)
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(()=>{
    document.addEventListener("scroll",()=>{
      if(pageYOffset > 0){
        header.current?.classList.add(styles.sticky)
      }else{
        header.current?.classList.remove(styles.sticky)
      }
    })

  },[])

  return (
    <nav className={`${styles.navbar}`} ref={header}>
        <div className={`${styles.navbar_container}  ${isActive ? styles.isActive : ''}`}>
            <div className={`${styles.navbar_container_logo}`}>
              <Link href="/"><Image src={Logo} width={290} height={389} alt="logo"/></Link>
            </div>
            <div className={`${styles.navbar_container_linksandbtn}`}>
                <ul>
                    <li className={currentPath == "/" ? styles.active : ""}><Link href="/" >Inicio</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="algo.com">Buscar mascota</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="algo.com">Reportar mascota</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="algo.com">Adoptar</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="algo.com">Como funciona?</Link></li>
                </ul>
                <Link href="/signup"><Button size='medium'>Iniciar sesion</Button></Link>
            </div>
            <div className={`${styles.navbar_container_close} ${isActive ? styles.isActive : ''}`} onClick={toggleMenu}>
              <span className={`${styles.navbar_container_close_line}`}></span>
              <span className={`${styles.navbar_container_close_line}`}></span>
              <span className={`${styles.navbar_container_close_line}`}></span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
