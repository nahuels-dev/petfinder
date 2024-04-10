import React from 'react'
import styles from "./Navbar.module.scss";
import Link from 'next/link';

function Navbar() {
  return (
    <nav className={`${styles.navbar}`}>
        <div className={`${styles.navbar_container}`}>
            <div className={`${styles.navbar_container_logo}`}></div>
            <div className={`${styles.navbar_container_linksandbtn}`}>
                <ul>
                    <li><Link href="algo.com">Inicio</Link></li>
                    <li><Link href="algo.com">Buscar mascota</Link></li>
                    <li><Link href="algo.com">Reportar mascota</Link></li>
                    <li><Link href="algo.com">Adoptar</Link></li>
                    <li><Link href="algo.com">Como funciona?</Link></li>
                </ul>
                <button>Iniciar sesion</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
