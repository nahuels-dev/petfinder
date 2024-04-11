"use client"
import React, { useState,useEffect,useRef } from 'react'
import styles from "./Navbar.module.scss";
import Link from 'next/link';
import { Button } from '../Button';
function Navbar() {

  const [isActive, setIsActive] = useState(false);
  const header = useRef<HTMLElement>(null)
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(()=>{
    document.addEventListener("scroll",()=>{
      console.log(pageYOffset)
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
            <div className={`${styles.navbar_container_logo}`}></div>
            <div className={`${styles.navbar_container_linksandbtn}`}>
                <ul>
                    <li><Link href="algo.com">Inicio</Link></li>
                    <li><Link href="algo.com">Buscar mascota</Link></li>
                    <li><Link href="algo.com">Reportar mascota</Link></li>
                    <li><Link href="algo.com">Adoptar</Link></li>
                    <li><Link href="algo.com">Como funciona?</Link></li>
                </ul>
                <Button size='medium'>Iniciar sesion</Button>
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
