"use client"

import React, { useState,useEffect,useRef } from 'react'
import styles from "./Navbar.module.scss"
import Link from 'next/link';
import { Button } from '../Button'
import Image from 'next/image';
import Logo from "@/assets/images/logo.png"
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

function Navbar() {
  const currentPath = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [isProfileExpanded, setIsProfileExpanded] = useState(false)
  const [userName, setUserName]= useState('')
  const header = useRef<HTMLElement>(null)

  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  useEffect(()=>{
    document.addEventListener("scroll",()=>{
      if(pageYOffset > 0){
        header.current?.classList.add(styles.sticky)
      }else{
        header.current?.classList.remove(styles.sticky)
      }
    })
   
  },[])

  useEffect(() => {
    setUserName(user ? user.user_metadata.full_name : null)
  }, [user])

  return (
    <nav className={`${styles.navbar}`} ref={header}>
        <div className={`${styles.navbar__container}  ${isActive ? styles.isActive : ''}`}>
            
            <div className={`${styles.navbar__container__logo}`}>
              <Link href="/"><Image src={Logo} width={290} height={389} alt="logo"/></Link>
            </div>

            <div className={`${styles.navbar__container__linksandbtn}  ${isProfileExpanded ? styles.expanded : ""}`}>
                <ul>
                    <li className={currentPath == "/" ? styles.active : ""}><Link href="/" >Inicio</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="buscar">Buscar mascota</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="reportar">Reportar mascota</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="algo.com">Adoptar</Link></li>
                    <li className={currentPath == "/algo" ? styles.active : ""}><Link href="como-funciona">Como funciona?</Link></li>
                </ul>

                {user ?
                <div className={`${styles.profileNavbar} ${isProfileExpanded ? styles.expanded : ""}`}>
                  <div onClick={() => setIsProfileExpanded(!isProfileExpanded)}>Hola {userName}</div>
                  <div className={styles.navbarHided}>
                    <Link href="/perfil">Perfil</Link>
                    <p>Mis publicaciones</p>
                    <p>Favoritos</p>
                    <p>Notificaciones</p>
                    <p onClick={()=> logout()} >Desconectarse</p>
                  </div>
                </div>

                :
                <Link href="/login"><Button size='medium'>Iniciar sesion</Button></Link>

                }
            </div>

            <div className={`${styles.navbar__container__close} ${isActive ? styles.isActive : ''}`} onClick={toggleMenu}>
              <span className={`${styles.navbar__container_close__line}`}></span>
              <span className={`${styles.navbar__container_close__line}`}></span>
              <span className={`${styles.navbar__container__close__line}`}></span>
            </div>

        </div>
    </nav>
  )
}

export default Navbar
