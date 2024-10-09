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

import DefaultProfilePhoto from "@/assets/images/logo.png"


import FavoriteImg from "@/assets/images/favoriteFullIcon.png"
import NoFavoriteImg from "@/assets/images/favoriteEmptyIcon.png"

import { Button } from '@/components/Button'
import { useContext, useEffect, useState } from 'react'

import { formatDate } from '@/helpers/date'
import { PetState } from '@/components/PetState/PetState'
import { createClient } from '@supabase/supabase-js'
import Loading from '@/components/Loading/Loading'
import Swal from 'sweetalert2'

function PageWrapper() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  const { checkSession } = useContext(AuthenticationContext)
  const [petInfo, setPetInfo] = useState<any>({})
  const [loggedInfo, setLoggedInfo] = useState<any>({})
  const [creatorInfo, setCreatorInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [sawitModalOn, setSawitModalOn] = useState(false)
  const [reportModalOn, setReportModalOn] = useState(false)
  const [reportMsg,setReportMsg]= useState("")
  const [editModal, setEditModal] = useState(false)

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
    if (storageSession) {
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
        if (data) {
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

        if (data) {
          setCreatorInfo(data.user)
        }
      } catch (error: any) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    }

    if (petID) {
      getData();
    }
  }, [])

  const favorite = (e: any) => {
    // Nahuel Funcion duplicada, para helpers y ver lo de redirect en la home (carouselItem component, comentario //nahuel)
    e.stopPropagation()
    console.log("favorite function")
  }


  useEffect(() => {
    if (Object.keys(petInfo).length > 0 && Object.keys(creatorInfo).length > 0) {
      setLoading(false)
    }
  }, [petInfo, creatorInfo]);


  const iSawIt = (e: any) => {
    setSawitModalOn(true)
  }

  const report = (e: any) => {
    setReportModalOn(true)
  }

  const edit = (e: any) => {
    setEditModal(true)
  }

  
  let date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const today = `${year}-${month}-${day}`

  const [street,setStreet]= useState("")
  const [esq,setEsq]= useState("")
  const [seenDate,setSeenDate]= useState(today)

  const sendLastSeen =async ()=>{
    //Habria que lockear la opcion de hacerlo muchas veces seguido en la misma publicacion
   if(street || esq){
      const json = {
        "calle": street,
        "esquina": esq,
        "fecha": seenDate
      }

      const { data, error } = await supa
          .from('alert_post')
          .select('lastSeen')
          .eq('id', petID)
      if(!data![0].lastSeen){
        const a = await supa
        .from('alert_post')
        .update({ lastSeen: [json] })
        .eq('id', petID)

        console.log(a)
        location.reload()
      }else{
        let arr = data![0].lastSeen
        arr.push(json)
        const a = await supa
        .from('alert_post')
        .update({ lastSeen: arr })
        .eq('id', petID)

        location.reload()
      }

   }else{
    Toast.fire({
      icon: 'error',
      title: 'Debes llenar la calle o la esquina',
      })
   }
  }

  const editPost = ()=> {
    console.log("editando")
  }
  const finishPost = ()=> {
    console.log("terminando post")
  }
  const reportPost = async () => {
    //Si tiene 3 o mas reporte no se tendria que poder ver la publicacion hasta que un mod evalue
    //Habria que lockear la opcion de hacerlo muchas veces seguido en la misma publicacion
    if(!loggedInfo){
      Toast.fire({
        icon: 'error',
        title: 'Debes estar logueado para reportar',
        })
      return
    }
    if(reportMsg){
      const json = {
        "reporte": reportMsg,
        "usuarioQueReporta": loggedInfo.id
      }
      const { data, error } = await supa
          .from('alert_post')
          .select('reports')
          .eq('id', petID)
      if(!data![0].reports){
        const a = await supa
        .from('alert_post')
        .update({ reports: [json] })
        .eq('id', petID)

        location.reload()
      }else{
        let arr = data![0].reports
        arr.push(json)
        const a = await supa
        .from('alert_post')
        .update({ report: arr })
        .eq('id', petID)

        location.reload()
      }

   }else{
    Toast.fire({
      icon: 'error',
      title: 'Debes Explicar porque el reporte',
      })
   }
  }
  const deletePost = ()=> {
    console.log("borrando")
    /* 
    Ademas de borrar el post, se deberia de mandar un email a la persona avisando que un post fue borrado, que se contacte con nuestro email para saber el motivo.
    Esto guardaria el post en otra tabla y lo borraria de la actual. Asi la actual no se llena de cosas, y si fue un error, la podriamos devolver.
    Tendriamos tambien que contar cuantos post ya le borramos, al 3ero pa la calle, ban a la cuenta
    */
  }
  return (
    <>
      <div className={`${styles.iSawItModal} ${ sawitModalOn ? styles.iSawItModal_on : ""}`}>
        <div className={styles.iSawItModal__body}>
          <input type="text" placeholder='Calle' value={street} onChange={(e)=> setStreet(e.target.value)}/>
          <input type="text" placeholder='Esq' value={esq} onChange={(e)=> setEsq(e.target.value)}/>
          <input type="date" max={today} defaultValue={seenDate} onChange={(e)=> setSeenDate(e.target.value)}/>
          <Button size='small' theme='light' onClick={()=> sendLastSeen()}>Enviar</Button>
          <div className={styles.closeModal} onClick={()=> setSawitModalOn(false) }></div>
        </div>
      </div>

      <div className={`${styles.reportModal} ${ reportModalOn ? styles.reportModal_on : ""}`}>
        <div className={styles.reportModal__body}>
        <textarea placeholder='Explicanos porque lo quieres reportar' value={reportMsg} onChange={(e)=> setReportMsg(e.target.value)}/>
          <Button size='small' theme='light' onClick={()=> reportPost()}>Enviar</Button>
          <div className={styles.closeModal} onClick={()=> setReportModalOn(false) }></div>
        </div>
      </div>

      <div className={`${styles.editModal} ${ editModal ? styles.editModal_on : ""}`}>
        <div className={styles.editModal__body}>
          <input type="text" placeholder='Calle' value={"Por ahora nada"} onChange={(e)=> console.log("algo")}/>
          <textarea placeholder='Descripcion' value={"Por ahora nada"} onChange={(e)=> console.log("algo")}/>
          <Button size='small' theme='light' onClick={()=> reportPost()}>Enviar</Button>
          <div className={styles.closeModal} onClick={()=> setEditModal(false) }></div>
        </div>
      </div>
      <div className={styles.pageContainer}>



        {!loading && (
          <>
            <main className={styles.mainDetails}>
              <div className={styles.postOptions}>
                {loggedInfo.id == petInfo.user_id && (
                  <>
                    <Image src={FinishIconIMG} width={60} height={60} alt="Terminar publicacion icono" onClick={finishPost} />
                    <Image src={EditIconIMG} width={58} height={58} alt="Editar publicacion icono" onClick={edit}/>
                  </>
                )}
                {loggedInfo.id != petInfo.user_id && (
                  <>
                    <Image src={ReportIconIMG} width={58} height={58} alt="Reportar publicacion icono" onClick={report}/>
                  </>
                )}
                {/* Esto de abajo seria si es admin o moderador lo voy a dejar asi hasta tener roles  y el usuario mismo*/}
                {loggedInfo.user_metadata != undefined && loggedInfo.user_metadata.role == "admin" && (
                  <Image src={DeleteIconIMG} width={58} height={58} alt="Borrar publicacion icono" onClick={deletePost}/>
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
                  <p className={styles.greyText}><Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen" />Visto por última vez en Aguada - {formatDate(petInfo.lastSeen)}</p>
                  <h3>{petInfo.title}</h3>
                  <p className={styles.mainDescription}>{petInfo.description}</p>
                  <div className={styles.tables}>
                    <InfoTable />
                  </div>
                  <div className={styles.creatorInfo}>
                    <div className={styles.photo}>
                      {creatorInfo.user_metadata.image && (
                        <img src={creatorInfo.user_metadata.image} />
                      )}
                      {!creatorInfo.user_metadata.image && (
                        <Image src={DefaultProfilePhoto} width={36} height={36} alt="Reloj imagen" />
                      )}

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
                <Button size='medium' theme='light' onClick={(e: any) => iSawIt(e)} >La ví!</Button>
              </div>
            </main>
            <div className={styles.seenPlaces}>
              <h3>Historial de avistamientos:</h3>
              {petInfo?.lastSeen?.length > 0 && petInfo.lastSeen.map((el: any, index: number) => (
                <p key={index} className={styles.places}>
                  <Image src={LastSeenImg} width={36} height={36} alt="Reloj imagen" />
                  {el.calle} {el.esquina && 'esq: ' + el.esquina} - {el.fecha}
                </p>
              ))}
            </div>
          </>
        )}

        {loading && (
          <Loading />
        )}


      </div>
    </>
  )

}


export default function Page() {
  return (
    <Suspense>
      <PageWrapper />
    </Suspense>
  )
}
