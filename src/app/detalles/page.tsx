"use client"
import styles from '@/styles/pages/AnimalDetails.module.scss'
import AnimalsDetailCarousel from '@/components/animalDetailsCarousel/page'
import { InfoTable } from '@/components/InfoTable/InfoTable'
import Image from 'next/image'
import LastSeenImg from "@/assets/images/lastSeenImg.png"
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ReportIconIMG from "@/assets/images/reportIcon.png"
import EditIconIMG from "@/assets/images/editIcon.png"
import FinishIconIMG from "@/assets/images/finishIcon.png"
import { AuthenticationContext } from "@/context/Authentication"

import { Button } from '@/components/Button'
import { useContext, useEffect, useState } from 'react'

import { formatDate } from '@/helpers/date'

export default function Page() {

  const { checkSession } = useContext(AuthenticationContext)

  const supabase = createClientComponentClient()
  const [petInfo, setPetInfo] = useState<any>({})
  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)
  
  const searchParams = useSearchParams()
 
  const petID = searchParams.get('q')

  useEffect(() => {
    let storageSession = checkSession() as any
    if(storageSession){
        storageSession = JSON.parse(storageSession)
        setCreatorInfo(storageSession.user)
        console.log(storageSession.user)
    }
    async function getData() {
      try {
        const { data, error } = await supabase
        .from('alert_post')
        .select('*')
        .eq('id', petID)

        setPetInfo(data[0])
        console.log(data)
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    if(petID){
      getData();   
    }
  }, [])
  

  useEffect(() => {
    if(Object.keys(petInfo).length > 0){
      setLoading(false)
    }
  }, [petInfo]);
  
  return (
    <div className={styles.pageContainer}>
      {Object.keys(petInfo).length > 0 && (
        <>
        <main className={styles.mainDetails}>
          <div className={styles.postOptions}>
            {creatorInfo.id == petInfo.id && (
              <>
                <Image src={FinishIconIMG} width={60} height={60} alt="Terminar publicacion icono" />
                <Image src={EditIconIMG} width={58} height={58} alt="Editar publicacion icono" />
              </>
            )}
            {creatorInfo.id != petInfo.id && (
              <>
                <Image src={ReportIconIMG} width={58} height={58} alt="Reportar publicacion icono" />
              </>
            )}
            {/* Esto de abajo seria si es admin o moderador */}
            <Image src={ReportIconIMG} width={58} height={58} alt="Borrar publicacion icono" />
          </div>
          <div className={styles.animalDetails}>
            <div className={styles.animalImgs}>
              <div>
                <AnimalsDetailCarousel images={petInfo.images} />
              </div>
            </div>
            <div className={styles.animalTexts}>
            <p className={styles.greyText}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen"/>Visto por última vez en Aguada - {formatDate(petInfo.lastSeen)}</p>
            <h3>{petInfo.title}</h3>
            <p className={styles.mainDescription}>{petInfo.description}</p>
            <div className={styles.tables}>
              <InfoTable />
            </div>
              <div className={styles.creatorInfo}>
                <div className={styles.photo}>
                </div>
                <div className={styles.creatorText}>
                  <p className={styles.creatorName}>{creatorInfo.user_metadata.full_name}</p>
                  <p className={styles.creatorMail}>{creatorInfo.user_metadata.email}</p>
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
      </>
      )}
      
      {loading && (
        <h1>Cargando</h1>
      )}
    
    
    </div>)
}