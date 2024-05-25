import React from 'react'
import styles from "@/styles/pages/Perfil.module.scss"
function page() {
  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <div>&gt;&nbsp;Panel de control</div>
        <div>&gt;&nbsp;Perfil</div>
        <div>&gt;&nbsp;Publicaciones</div>
        <div>&gt;&nbsp;Favoritos</div>
        <div>&gt;&nbsp;Notificaciones</div>
      </aside>
      <div className={styles.main_content}></div>
    </main>
  )
}

export default page
