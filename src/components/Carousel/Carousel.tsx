"use client"
import React , { useCallback, useEffect, useState }  from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from "./Carousel.module.scss"
import {CarouselProps} from '../../types/types'
import { CarouselItem } from '../CarouselItem/CarouselItem'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


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

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
    
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
  

  return (
    <div className={`${styles.embla} ${dataFinal.length == 1 ? styles.oneSon : ""}`}>
      {!isLoading ? (
        <div className={`${styles.embla__viewport}`}  ref={emblaRef}>
            <div className={`${styles.embla__container} ${dataFinal.length == 1 ? styles.oneSonCentered : ""}`}>
                {dataFinal && dataFinal.map((item:any, index:any) => (
                  <CarouselItem key={index} title={item.title} description={item.description} image={item.images[0]} tipo={tipo} />
                ))}
            </div>
            <h3>{titulo}</h3>
            <button className={`${styles.embla__viewport__prev}`} onClick={scrollPrev}>&lt;</button>
            <button className={`${styles.embla__viewport__next}`} onClick={scrollNext}>&gt;</button>
        </div>
      ): (
        <h4>Cargando</h4>
      )}
    </div>
  )
}
