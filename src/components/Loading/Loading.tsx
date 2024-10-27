import React from 'react'
import Image from 'next/image'
import Paw from "@/assets/images/huella.png"
import styles from "./Loading.module.scss"
function Loading() {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>Encontrando tus mascotas...</h3>
        <div className={styles.loader}>
            <span className={`${styles.icon} ${styles.left_paw}`}>
                <Image src={Paw} width={301} height={299} alt='huella animal' />
            </span>
            <span className={`${styles.icon} ${styles.right_paw}`}>
                <Image src={Paw} width={301} height={299} alt='huella animal' />
            </span>
        </div>
    </div>
  )
}

export default Loading
