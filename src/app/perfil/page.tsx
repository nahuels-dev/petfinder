"use client"
import React from 'react'
import styles from "@/styles/pages/Perfil.module.scss"
import { useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthenticationContext } from "@/context/Authentication"
import { useSearchParams, usePathname  } from 'next/navigation'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"
import { CarouselItem } from '@/components/CarouselItem/CarouselItem'
import Link from 'next/link'
import { formatDate } from '@/helpers/date'

const ProfileState = {
  PanelControl: 'PanelControl',
  Perfil: 'Perfil',
  Publicaciones: 'Publicaciones',
  Favoritos: 'Favoritos',
  Notificaciones: "Notificaciones"
}; 


function Page() {

  const [profileState, setProfileState] = useState(ProfileState.PanelControl)
  const { checkSession } = useContext(AuthenticationContext)
  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const [petInfo, setPetInfo] = useState<any>({})
  const searchParams = useSearchParams()
  const initialParams = searchParams.get('q') || ProfileState.PanelControl
  const supabase = createClientComponentClient()
  let state = searchParams.get('q')
  const router = useRouter()

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

  useEffect(() => {

    let storageSession = checkSession() as any
    if(storageSession){
        storageSession = JSON.parse(storageSession)
        setCreatorInfo(storageSession.user)
    }
    if (!checkSession()) {
        Toast.fire({
            icon: 'error',
            title: 'Debes iniciar sesion, redirigiendo.',
        })
        router.push('/iniciar')
    }
    if(initialParams != ""){
      setProfileState(initialParams)
    }else{
      setProfileState(ProfileState.PanelControl)
    }

  }, [])


  useEffect(() => {
    async function getData() {
      try {
        const { data, error } = await supabase
        .from('alert_post')
        .select('*')
        .eq('user_id', creatorInfo.id)

        setPetInfo(data)
        console.log(data)
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    if(creatorInfo.id){
      console.log("si")
      getData();   
    }
  }, [creatorInfo])

  const handleStateChange = (newState: string) => {
    setProfileState(newState)
    router.push(`?q=${newState}`)
  }


  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <div onClick={() => handleStateChange(ProfileState.PanelControl)} className={profileState == "PanelControl" ? styles.active : ""}>&gt;&nbsp;Panel de control</div>
        <div onClick={() => handleStateChange(ProfileState.Perfil)} className={profileState == "Perfil" ? styles.active : ""}>&gt;&nbsp;Perfil</div>
        <div onClick={() => handleStateChange(ProfileState.Publicaciones)} className={profileState == "Publicaciones" ? styles.active : ""}>&gt;&nbsp;Publicaciones</div>
        <div onClick={() => handleStateChange(ProfileState.Favoritos)} className={profileState == "Favoritos" ? styles.active : ""}>&gt;&nbsp;Favoritos</div>
        <div onClick={() => handleStateChange(ProfileState.Notificaciones)} className={profileState == "Notificaciones" ? styles.active : ""}>&gt;&nbsp;Notificaciones</div>
      </aside>
      {Object.keys(creatorInfo).length > 0 && (
      <div className={styles.main_content}>
          {profileState == "PanelControl" && (
            <div className={styles.profilePanel}>
              <h1 className={styles.title}>Panel de control</h1>
              <h4 className={styles.salutation}>Hola <span className={styles.colored}>{creatorInfo.user_metadata.full_name}!</span></h4>
              <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro exercitationem qui, repellat necessitatibus autem quam asperiores quis ad doloremque consequatur ex sapiente eligendi ipsum ratione.</p>
              <div className={styles.account_information}>
                <h3 className={styles.subTitle}>Informacion de la cuenta</h3>
                <div className={styles.columns}>
                  <p><span>Informacion de contacto</span> <span className={styles.editBtn}>Editar</span></p>
                  <p><span>Direcciones</span> <span className={styles.editBtn}>Editar</span></p>
                </div>
              </div>
            </div>
          )}
          {profileState == "Perfil" && (
            <h1>Perfil</h1>
          )}
          {profileState == "Publicaciones" && Object.keys(petInfo).length > 0 && (
              <div className={styles.publicaciones}>
                <h1>Publicaciones</h1> 
                <div className={styles.columns}>
                  {petInfo.map((pet: any, index: number) => (
                    <Link className={styles.carouselItemContainer} href={`/detalles?q=${pet.id}`} key={index}>
                      <CarouselItem title={pet.title} description={pet.description} image={pet.images[0]} tipo={pet.status} datePublished={formatDate(pet.created_at)}/>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
          {profileState == "Favoritos" && (
            <h1>Favoritos</h1>
          )}
          {profileState == "Notificaciones" && (
            <h1>Notificaciones</h1>
          )}
        
      </div>
      )}
    </main>
  )
}

export default Page
