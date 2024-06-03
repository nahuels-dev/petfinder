"use client"
import styles from '@/styles/pages/AnimalDetails.module.scss'
import AnimalsDetailCarousel from '@/components/animalDetailsCarousel/page'
import { InfoTable } from '@/components/InfoTable/InfoTable'
import Image from 'next/image'
import { Suspense } from "react";

import LastSeenImg from "@/assets/images/lastSeenImg.png"
import { useSearchParams } from 'next/navigation'
import ReportIconIMG from "@/assets/images/reportIcon.png"
import EditIconIMG from "@/assets/images/editIcon.png"
import FinishIconIMG from "@/assets/images/finishIcon.png"
import DeleteIconIMG from "@/assets/images/deleteicon.png"
import { AuthenticationContext } from "@/context/Authentication"


import FavoriteImg from "@/assets/images/favoriteFullIcon.png"
import NoFavoriteImg from "@/assets/images/favoriteEmptyIcon.png"

import { Button } from '@/components/Button'
import { useContext, useEffect, useState } from 'react'

import { formatDate } from '@/helpers/date'
import { PetState } from '@/components/PetState/PetState'
import { createClient } from '@supabase/supabase-js'
import Loading from '@/components/Loading/Loading'

function PageWrapper() {

  const { checkSession } = useContext(AuthenticationContext)
  const [petInfo, setPetInfo] = useState<any>({})
  const [loggedInfo, setLoggedInfo] = useState<any>({})
  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)
  
  const searchParams = useSearchParams()
 
  const petID = searchParams.get('q')

  const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_SERVICE || '', {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  
  useEffect(() => {
    let storageSession = checkSession() as any
    if(storageSession){
        storageSession = JSON.parse(storageSession)
        setLoggedInfo(storageSession.user)
        console.log(storageSession.user)
    }
    async function getData() {
      try {
        const { data, error } = await supa
        .from('alert_post')
        .select('*')
        .eq('id', petID)
        if(data){
          setPetInfo(data[0]!)
          await getCreatorData(data[0].user_id)
        }
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    async function getCreatorData(id: string) {
      try {
        //solo en serverside recomiendan el admin NAHUEL y no me esta trayendo nada por eso creo
        const { data } = await supa.auth.admin.getUserById(id)

        if(data){
          setCreatorInfo(data.user)
        }
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    if(petID){
      getData();   
    }
  }, [])

  const favorite = (e: any) => {
		// Nahuel Funcion duplicada, para helpers y ver lo de redirect en la home (carouselItem component, comentario //nahuel)
		e.stopPropagation()
		console.log("favorite function")
	}
  

  useEffect(() => {
    if(Object.keys(petInfo).length > 0 && Object.keys(creatorInfo).length > 0){
      setLoading(false)
    }
  }, [petInfo,creatorInfo]);
  

  const iSawIt = (e: any) =>{
    console.log("visto!")
  }
  return (
    <div className={styles.pageContainer}>
      {!loading  &&(
        <>
        <main className={styles.mainDetails}>
          <div className={styles.postOptions}>
            {loggedInfo.id == petInfo.user_id && (
              <>
                <Image src={FinishIconIMG} width={60} height={60} alt="Terminar publicacion icono" />
                <Image src={EditIconIMG} width={58} height={58} alt="Editar publicacion icono" />
              </>
            )}
            {loggedInfo.id != petInfo.user_id && (
              <>
                <Image src={ReportIconIMG} width={58} height={58} alt="Reportar publicacion icono" />
              </>
            )}
            {/* Esto de abajo seria si es admin o moderador lo voy a dejar asi hasta tener roles */}
            {loggedInfo.user_metadata.role == "admin" && (
              <Image src={DeleteIconIMG} width={58} height={58} alt="Borrar publicacion icono" />
            )}
          </div>
          <div className={styles.animalDetails}>
            <div className={styles.animalImgs}>
            <div className={styles.state}>
              <PetState estado={petInfo.status === "visto" ? "v" : petInfo.status === "busqueda" ? "b" : "r"} texto={petInfo.status} />
            </div>
            <div className={styles.favoriteImg} onClick={(e) => favorite(e)}>
            {/* IF FAVORITE */}
              <Image className={`${styles.slide__content__img}`} src={NoFavoriteImg} width={33} height={31} alt="favorite img" />
            </div>  
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
                  {creatorInfo.user_metadata &&
                  <>
                    <p className={styles.creatorName}>{creatorInfo.user_metadata.full_name}</p>
                    <p className={styles.creatorMail}>{creatorInfo.user_metadata.email}</p>
                  </>
                    
                  }
                  <p className={styles.creatorPhone}>099 se me para y se me mueve</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.seenAnimalBtn}>
            <Button size='medium' theme='light' /* onClick={iSawIt} */>La ví!</Button>
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
        <Loading />
      )}
    
    
    </div>
    )
    
}


export default function Page(){
  return (
    <Suspense>
      <PageWrapper />
    </Suspense>
  )
}
