import React , { useCallback }  from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import petImage from "../../../public/petImage.png"
import Image from 'next/image';
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
                <div className={`${styles.embla__slide}`}>
                    <div className={`${styles.embla__slide__content}`}>
                        <Image className={`${styles.embla__slide__content__img}`} src={petImage} width={834} height={536} alt="pet image"/>
                        <div className={`${styles.embla__slide__content__copy}`}>
                            <h4>Roku perdido en centro</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem </p>
                            <div className={`${styles.embla__slide__content__copy__tables}`}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Chris</th>
                                            <td>HTML </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Dennis</th>
                                            <td>Web </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sarah</th>
                                            <td>JavaScript </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Karen</th>
                                            <td>Web </td>
                                        </tr>
                                    </tbody>  
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Chris</th>
                                            <td>HTML </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Dennis</th>
                                            <td>Web </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sarah</th>
                                            <td>JavaScript </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Karen</th>
                                            <td>Web </td>
                                        </tr>
                                    </tbody>  
                                </table>
                            </div>
                            <span>Algo</span><br />
                            <span>Algo</span>
                        </div>
                        
                    </div>
                </div>
                <div className={`${styles.embla__slide}`}>
                    <div className={`${styles.embla__slide__content}`}>
                        <p>Slide 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem omnis autem alias assumenda ipsum. Ex, illum aperiam provident molestias harum asperiores quibusdam voluptatum vitae vel possimus eius nulla blanditiis ullam ipsam illo, neque cum!</p>
                        <span>Algo</span>
                    </div>
                </div>
                <div className={`${styles.embla__slide}`}>
                    <div className={`${styles.embla__slide__content}`}>
                        <p>Slide 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem omnis autem alias assumenda ipsum. Ex, illum aperiam provident molestias harum asperiores quibusdam voluptatum vitae vel possimus eius nulla blanditiis ullam ipsam illo, neque cum!</p>
                        <span>Algo</span>
                    </div>
                </div>
                <div className={`${styles.embla__slide}`}>
                    <div className={`${styles.embla__slide__content}`}>
                        <p>Slide 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem omnis autem alias assumenda ipsum. Ex, illum aperiam provident molestias harum asperiores quibusdam voluptatum vitae vel possimus eius nulla blanditiis ullam ipsam illo, neque cum!</p>
                        <span>Algo</span>
                    </div>
                </div>
                <div className={`${styles.embla__slide}`}>
                    <div className={`${styles.embla__slide__content}`}>
                        <p>Slide 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem omnis autem alias assumenda ipsum. Ex, illum aperiam provident molestias harum asperiores quibusdam voluptatum vitae vel possimus eius nulla blanditiis ullam ipsam illo, neque cum!</p>
                        <span>Algo</span>
                    </div>
                </div>
            </div>
            <h3>Viste alguno de estos?</h3>
            <button className={`${styles.embla__viewport__prev}`} onClick={scrollPrev}>&lt;</button>
            <button className={`${styles.embla__viewport__next}`} onClick={scrollNext}>&gt;</button>
        </div>
    </div>
  )
}

export default Carousel
