"use client"
import React , { useCallback, useEffect, useState }  from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from "./Carousel.module.scss"
import {CarouselProps} from '../../types/types'
import { CarouselItem } from '../CarouselItem/CarouselItem'


//https://www.embla-carousel.com/api/options/

export const Carousel: React.FC<CarouselProps> = ({ tipo, titulo }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        let url = tipo == "busqueda" ? "algo": "algootro"
        async function getData() {
            try {
              const response = await fetch('url');
              setData(await response.json())
              if (response.ok) {
                console.log('Todo bien');
              } else {
                console.log('Respuesta de red OK pero respuesta de HTTP no OK');
              }
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
    <div className={`${styles.embla}`}>
        <div className={`${styles.embla__viewport}`}  ref={emblaRef}>
            <div className={`${styles.embla__container}`}>
                <CarouselItem />
                <CarouselItem />
                <CarouselItem />
                <CarouselItem />
                <CarouselItem />
                <CarouselItem />
            </div>
            <h3>{titulo}</h3>
            <button className={`${styles.embla__viewport__prev}`} onClick={scrollPrev}>&lt;</button>
            <button className={`${styles.embla__viewport__next}`} onClick={scrollNext}>&gt;</button>
        </div>
    </div>
  )
}
