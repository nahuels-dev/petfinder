"use client"
import React , { useCallback, useEffect, useState }  from 'react'

import styles from "./Carousel.module.scss"
import {CarouselProps} from '../../types/types'
import { CarouselItem } from '../CarouselItem/CarouselItem'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import "keen-slider/keen-slider.min.css"



import { useKeenSlider } from "keen-slider/react"


//https://www.embla-carousel.com/api/options/

export const Carousel: React.FC<CarouselProps> = ({ tipo, titulo }) => {

    const [dataFinal, setDataFinal] = useState() as any
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClientComponentClient()
    //tipo es busqueda o pertence
    useEffect(() => {
        async function getData() {
            try {
              const { data, error } = await supabase
              .from('alert_post')
              .select('*')
              .eq('status', tipo.toLowerCase())
              .order('created_at', { ascending: false })
              .limit(7); 

              setDataFinal(data)
              console.log(data)
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
          perView: 3,
          spacing: 20,
        },
        
        breakpoints: {
          '(max-width: 900px)': {
            slides: {
              perView: 2,
              spacing: 10,
            },
          },
          '(max-width: 500px)': {
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

    function formatDate(dateString:string) {
      const date = new Date(dateString);
    
      // Obtiene el día, mes y año
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11
      const year = date.getFullYear();
    
      // Formatea la fecha al estilo día/mes/año
      return `${day}/${month}/${year}`;
    }


  return (
    <>
      {!isLoading ? (
        
        <div ref={sliderRef} className={`keen-slider ${styles.container}`}>
          {dataFinal && dataFinal.map((item:any, index:any) => (
            <CarouselItem key={index} title={item.title} description={item.description} image={item.images[0]} tipo={tipo} datePublished={formatDate(item.lastSeen)}/>
          ))}
        </div>
      ): (
        <h4>Cargando</h4>
      )}
      
    </>
   
  )
}
