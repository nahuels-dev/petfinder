import styles from '@/styles/pages/AnimalDetails.module.scss'
import AnimalsDetailCarousel from '@/components/animalDetailsCarousel/page'
import { InfoTable } from '@/components/InfoTable/InfoTable'
import Image from 'next/image'
import LastSeenImg from "@/assets/images/lastSeenImg.png"

import ReportIconIMG from "@/assets/images/reportIcon.png"
import EditIconIMG from "@/assets/images/editIcon.png"
import FinishIconIMG from "@/assets/images/finishIcon.png"

import { Button } from '@/components/Button'

export default function Page() {
  
  return (
    <div className={styles.pageContainer}>
    <main className={styles.mainDetails}>
      <div className={styles.postOptions}>
        <Image src={FinishIconIMG} width={60} height={60} alt="Terminar publicacion icono" />
        <Image src={EditIconIMG} width={58} height={58} alt="Editar publicacion icono" />
        <Image src={ReportIconIMG} width={58} height={58} alt="Reportar publicacion icono" />
      </div>
      <div className={styles.animalDetails}>
        <div className={styles.animalImgs}>
          <div>
            <AnimalsDetailCarousel />
          </div>
        </div>
        <div className={styles.animalTexts}>
         <p className={styles.greyText}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen"/>Visto por última vez en Aguada - 4/3/24</p>
         <h3>Roku perdido en centro</h3>
         <p className={styles.mainDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illum placeat possimus qui eum ullam omnis, eos beatae autem eligendi inventore minima quas libero ab debitis deserunt, laborum doloribus quaerat.</p>
         <div className={styles.tables}>
          <InfoTable />
         </div>
          <div className={styles.creatorInfo}>
            <div className={styles.photo}>
            </div>
            <div className={styles.creatorText}>
              <p className={styles.creatorName}>Tu puta madre</p>
              <p className={styles.creatorMail}>email@tuputamadre.com</p>
              <p className={styles.creatorPhone}>099 se me para y se me mueve</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.seenAnimalBtn}>
        <Button size='medium' theme='light'>La ví!</Button>
      </div>
    </main>
    <div className={styles.seenPlaces}>
      <h3>Historial de avistamientos:</h3>
      <p className={styles.places}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen"/>Aguada - 4/3/24</p>
      <p className={styles.places}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen"/>Aguada - 4/3/24</p>
      <p className={styles.places}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen"/>Aguada - 4/3/24</p>
    </div>
    
    </div>)
}