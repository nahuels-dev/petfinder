"use client"
import React from 'react'
import { Suspense } from "react";

import styles from "@/styles/pages/Perfil.module.scss"
import { useContext, useEffect, useState } from 'react'
/* import { createClientComponentClient } from '@supabase/auth-helpers-nextjs' */
import { createClient } from '@supabase/supabase-js'
import { AuthenticationContext } from "@/context/Authentication"
import { useSearchParams, usePathname  } from 'next/navigation'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"
import { CarouselItem } from '@/components/CarouselItem/CarouselItem'
import Link from 'next/link'
import { formatDate } from '@/helpers/date'
import { Button } from '@/components/Button';

const ProfileState = {
  PanelControl: 'PanelControl',
  Publicaciones: 'Publicaciones',
  Favoritos: 'Favoritos',
  Notificaciones: "Notificaciones",
  Admin: "Admin"
}; 


function PageContent() {

  const [profileState, setProfileState] = useState(ProfileState.PanelControl)
  const { checkSession } = useContext(AuthenticationContext)
  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const [favoritesPets, setFavoritesPets] = useState<any>({})
  const [openAccordeon, setOpenAccordeon] = useState<any>({})
  const [petInfo, setPetInfo] = useState<any>({})
  const searchParams = useSearchParams()
  const initialParams = searchParams.get('q') || ProfileState.PanelControl
  /* const supabase = createClientComponentClient() */
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_SERVICE || '', {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  let state = searchParams.get('q')
  const router = useRouter()
  const [editInformationModal, setEditInformationModal] = useState(false)

  const updatedData = {
    Nombre: "",
    Telefono: "",
    Email: "",
    Facebook: "",
    Instagram: "",
    Twitter: "",
    Direccion1: "",
    Direccion2: "",
    Direccion3: ""
  }

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
      console.log(storageSession)
        storageSession = JSON.parse(storageSession)
        setCreatorInfo(storageSession.user)
        console.log(storageSession.user)
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
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }
    
    async function getFavorites() {
      try {
        const { data, error } = await supabase
        .from('favorites')
        .select('post_id')
        .eq('user_id', creatorInfo.id)
        let newerData = []
        if(data && data?.length > 0){
          console.log(data)
          for (const pet of data) {
            console.log(pet)
            const { data: favoritesData, error:favoritesError } = await supabase
            .from('alert_post')
            .select('*')
            .eq('id', pet.post_id)

            if(favoritesData && favoritesData.length > 0){
              newerData.push(favoritesData[0])
            }
          }
          if(newerData?.length > 0){
            console.log(newerData, "aca")
            setFavoritesPets(newerData)
          }
        }
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    if(creatorInfo.id){
      getData();   
      getFavorites();
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
        <div onClick={() => handleStateChange(ProfileState.Publicaciones)} className={profileState == "Publicaciones" ? styles.active : ""}>&gt;&nbsp;Publicaciones</div>
        <div onClick={() => handleStateChange(ProfileState.Favoritos)} className={profileState == "Favoritos" ? styles.active : ""}>&gt;&nbsp;Favoritos</div>
        <div onClick={() => handleStateChange(ProfileState.Notificaciones)} className={profileState == "Notificaciones" ? styles.active : ""}>&gt;&nbsp;Notificaciones</div>
        { creatorInfo.user_metadata && creatorInfo.user_metadata.role == "admin" &&
            <div onClick={() => handleStateChange(ProfileState.Admin)} className={profileState == "Admin" ? styles.active : ""}>&gt;&nbsp;Admin Panel</div>
        }
      </aside>
      {Object.keys(creatorInfo).length > 0 && (
        <>
        <div className={`${styles.iSawItModal} ${ editInformationModal ? styles.iSawItModal_on : ""}`}>
        <div className={styles.iSawItModal__body}>
          {/* <input type="text" placeholder='Calle' value={street} onChange={(e)=> setStreet(e.target.value)}/>
          <input type="text" placeholder='Esq' value={esq} onChange={(e)=> setEsq(e.target.value)}/>
          <input type="date" max={today} defaultValue={seenDate} onChange={(e)=> setSeenDate(e.target.value)}/>
          <Button size='small' theme='light' onClick={()=> sendLastSeen()}>Enviar</Button> */}
          <div className={styles.closeModal} onClick={()=> setEditInformationModal(false) }></div>
        </div>
        </div>
        <div className={styles.main_content}>
            {profileState == "PanelControl" && (
              <div className={styles.profilePanel}>
                <h1 className={styles.title}>Panel de control</h1>
                <h4 className={styles.salutation}>Hola <span className={styles.colored}>{creatorInfo.user_metadata.full_name}!</span></h4>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro exercitationem qui, repellat necessitatibus autem quam asperiores quis ad doloremque consequatur ex sapiente eligendi ipsum ratione.</p>
                <div className={styles.perfil}>
                <h1>Cuenta <span className={styles.editBtn} onClick={() => setEditInformationModal(true)}>Editar</span></h1>
                <p>Nombre: {creatorInfo.user_metadata.full_name}</p>
                <p>Telefono: {(creatorInfo.phone).length > 0 ? creatorInfo.phone : "No hay telefono asociado con esta cuenta"}</p>
                <p>Email: {creatorInfo.email}</p>
                <p>Contraseña: *******</p>
                
              </div>
              <div className={styles.account_information}>
                <h3 className={styles.subTitle}>Informacion de la cuenta</h3>
                <div className={styles.columns}>
                  <div>
                    <p><span>Informacion de contacto</span></p>
                    <p>Facebook:</p>
                    <p>Instagram:</p>
                    <p>Twitter:</p>
                  </div>
                  <div>
                    <p><span>Direcciones</span> </p>
                    <p>Direccion 1:</p>
                    <p>Direccion 2:</p>
                    <p>Direccion 3:</p>
                  </div>
                </div>
              </div>
              </div>
            )}
            {profileState == "Publicaciones" && Object.keys(petInfo).length > 0 && (
                <div className={styles.publicaciones}>
                  <h1>Publicaciones</h1> 
                  <div className={styles.columns}>
                    {petInfo.map((pet: any, index: number) => (
                      <Link className={styles.carouselItemContainer} href={`/detalles?q=${pet.id}`} key={index}>
                        <CarouselItem title={pet.title} additionalInformation={pet.additionalInformation} description={pet.description} image={pet.images[0]} tipo={pet.status} datePublished={formatDate(pet.created_at)}/>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            {profileState == "Favoritos" && Object.keys(favoritesPets).length > 0 &&(
              <div className={styles.publicaciones}>
                <h1>Favoritos</h1>
                <div className={styles.columns}>
                    {favoritesPets.map((pet: any, index: number) => (
                      <Link className={styles.carouselItemContainer} href={`/detalles?q=${pet.id}`} key={index}>
                        <CarouselItem title={pet.title} additionalInformation={pet.additionalInformation} description={pet.description} image={pet.images[0]} tipo={pet.status} datePublished={formatDate(pet.created_at)}/>
                      </Link>
                    ))}
                </div>
              </div>
            )}
            {profileState == "Notificaciones" && (
              <div className={styles.notificaciones}>
                <h1>Notificaciones</h1>
                <p>Notificacion 1 <span>x</span></p>
                <p>Notificacion 2 <span>x</span></p>
                <p>Notificacion 3 <span>x</span></p>
                <Button theme='light'>Añadir Notificacion</Button>
                <div className={styles.nuevaNoti}>
                  <div className={styles.acordionContainer}>
                    <button className={styles.accordion} onClick={(e) => setOpenAccordeon(!openAccordeon)}>Tipo de notificación <span>X</span></button>
                    <div className={`${styles.panel} ${ openAccordeon && styles.active}`}>
                      <label htmlFor=''>
                          <input type="checkbox" /> Vacunaciones gratuitas
                      </label>
                      <label htmlFor=''>
                          <input type="checkbox" /> Castraciones “ ”
                      </label>
                      <label htmlFor=''>
                          <input type="checkbox" /> Doy en adopción
                      </label>
                      <label htmlFor=''>
                          <input type="checkbox" /> Promociones
                      </label>
                    </div>   
                  </div>
                  <div className={styles.tags}>
                      <div className={styles.tag}></div>
                      <div className={styles.tag}></div>
                      <div className={styles.tag}></div>
                  </div>

                  <Button theme='light'>Guardar</Button>
                </div>
              </div>
            )}
            {profileState == "Admin" && (
              <div className={styles.notificaciones}>
                Guenas
              </div>
            )}
          
        </div>
        </>
      )}
    </main>
  )
}

function Page(){
  return(
    <Suspense>
      <PageContent/>
    </Suspense>
  )
}
export default Page
