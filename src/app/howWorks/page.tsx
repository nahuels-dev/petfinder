import React from 'react'
import styles from "@/styles/pages/HowWorks.module.scss"
import Image from 'next/image'
import BGCircleIMG from "@/assets/images/bgCircle.png"

function page() {
  return (
    <div className={styles.howWorks}>
      <div className={`${styles.sectionText}`}>
        <Image src={BGCircleIMG} alt="bgCircle" width={1236} height={1240} className={styles.backgroundCircle}></Image>
        <div className={styles.text}>
            <h3>Publica los detalles de tu mascota:</h3>
            <p>Crea una publicación detallada sobre tu mascota perdida. Proporciona información relevante como su descripción, fotografías (se mostrarán como galería), lugar y hora de la desaparición.</p>
        </div>
      </div>
      <div className={`${styles.sectionText} ${styles.seccionReverse}`}>
        <Image src={BGCircleIMG} alt="bgCircle" width={1236} height={1240} className={styles.backgroundCircle}></Image>
        <div className={styles.text}>
            <h3>Reporta avistamientos:</h3>
            <p>Si alguien ha visto a tu mascota, pueden reportarlo en nuestra aplicación. Registraremos la ubicación y la fecha del avistamiento, creando así un historial útil para rastrear a tu mascota.</p>
        </div>
      </div>
      <div className={`${styles.sectionText}`}>
        <Image src={BGCircleIMG} alt="bgCircle" width={1236} height={1240} className={styles.backgroundCircle}></Image>
        <div className={styles.text}>
            <h3>Recupera a tu mascota:</h3>
            <p>En caso de que alguien haya encontrado a tu mascota y la tenga consigo, pueden indicarlo en la aplicación. Te conectaremos con la persona para que puedas recuperar a tu amigo peludo lo antes posible.</p>
        </div>
      </div>
      <div className={`${styles.sectionDivider}`}></div>
      <div className={styles.howWorksLastSection}>
        <h3>Por que elegirnos?</h3>
        <ul>
            <li><span className={styles.colored}>Comunidad solidaria:</span> Únete a nuestra comunidad de amantes de los animales que se preocupan por ayudar a reunir a las mascotas perdidas con sus dueños.</li>
            <li><span className={styles.colored}>Seguridad y privacidad:</span> Garantizamos la seguridad y la privacidad de tus datos personales y la información de tu mascota.</li>
            <li><span className={styles.colored}>Asistencia personalizada:</span> Nuestro equipo está disponible para ayudarte en todo momento durante el proceso de búsqueda y recuperación de tu mascota.</li>
            <li><span className={styles.colored}>Consejos útiles:</span> Encuentra consejos y recursos útiles para maximizar tus esfuerzos de búsqueda y aumentar las posibilidades de encontrar a tu mascota rápidamente.</li>
        </ul>
      </div>
    </div>
  )
}

export default page
