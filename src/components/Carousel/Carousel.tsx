import React , { useCallback }  from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from "./Carousel.module.scss"
import {CarouselProps} from '../../types/types'
import { CarouselItem } from '../CarouselItem/CarouselItem'


//https://www.embla-carousel.com/api/options/

export const Carousel: React.FC<CarouselProps> = ({ tipo, titulo }) => {

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
