"use client"
import React , { useCallback, useContext, useEffect, useState }  from 'react'

import styles from "./Carousel.module.scss"
import {CarouselProps} from '../../types/types'
import { CarouselItem } from '../CarouselItem/CarouselItem'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import "keen-slider/keen-slider.min.css"
import Link from 'next/link'
import { AuthenticationContext } from "@/context/Authentication"

import { formatDate } from '@/helpers/date'


import { useKeenSlider } from "keen-slider/react"


//https://www.embla-carousel.com/api/options/

export const Carousel: React.FC<CarouselProps> = ({ tipo, titulo }) => {
    const { checkSession } = useContext(AuthenticationContext)
    const [dataFinal, setDataFinal] = useState() as any
    const [isLoading, setIsLoading] = useState(true)
    const [loggedInfo, setLoggedInfo] = useState<any>({})
    const supabase = createClientComponentClient()
    //tipo es busqueda o pertence
    useEffect(() => {
        async function getData() {
          let storageSession = checkSession() as any
          if(storageSession){
              storageSession = JSON.parse(storageSession)
              setLoggedInfo(storageSession.user)
          }

            try {
              const { data, error } = await supabase
              .from('alert_post')
              .select('*')
              .eq('status', tipo.toLowerCase())
              .order('created_at', { ascending: false })
              .limit(7); 

              setDataFinal(data)
              setIsLoading(false)
            } catch (error: any) {
              console.log('Hubo un problema con la petición Fetch:' + error.message);
            }
          }
          
          getData();          
    }, [])

    const [sliderRef] = useKeenSlider<HTMLDivElement>(
      {
        loop: true,
        slides: {
          perView: 2.8,
          spacing: 60,
        },
        
        breakpoints: {
          '(max-width: 1200px)': {
            slides: {
              perView: 2,
              spacing: 10,
            },
          },
          '(max-width: 550px)': {
            slides: {
              perView: 1,
              spacing: 10,
            },
          },
        },
      },
      [
        (slider) => {
          let timeout: ReturnType<typeof setTimeout>
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 2000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ]
    )

    


  return (
    <>
      {!isLoading ? (
        <div ref={sliderRef} className={`keen-slider ${styles.container}`}>
          {dataFinal && dataFinal.map((item:any, index:any) => (
            <Link href={`/detalles?q=${item.id}`} key={index}>
              <CarouselItem  title={item.title} description={item.description} image={item.images[0]} tipo={tipo} datePublished={formatDate(item.lastSeen)}/>
            </Link>
          ))}
        </div>
      ): (
        <h4>Cargando</h4>
      )}
      
    </>
   
  )
}
