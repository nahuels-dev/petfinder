import React , { useCallback }  from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import styles from "./Carousel.module.scss"

//https://www.embla-carousel.com/api/options/

function Carousel() {
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
                <div className={`${styles.embla__slide}`}>Slide 1</div>
                <div className={`${styles.embla__slide}`}>Slide 2</div>
                <div className={`${styles.embla__slide}`}>Slide 3</div>
                <div className={`${styles.embla__slide}`}>Slide 4</div>
                <div className={`${styles.embla__slide}`}>Slide 5</div>
            </div>
            <button className={`${styles.embla__prev}`} onClick={scrollPrev}>Prev</button>
            <button className={`${styles.embla__next}`} onClick={scrollNext}>Next</button>
        </div>
    </div>
  )
}

export default Carousel
