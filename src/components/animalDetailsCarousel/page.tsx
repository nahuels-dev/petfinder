"use client"
import React, { useEffect, useState } from "react"
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import styles from "./AnimalDetailsCarousel.module.scss"
function ThumbnailPlugin(
    //@ts-ignore
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        slider.update()
      })
    })

    slider.on("created", () => {
      if (!mainRef.current) return
      if(typeof window != "undefined"){
        observer.observe(slider.container, { childList: true })
      }
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })

    slider.on("destroyed", () => {
      observer.disconnect()
    })
  }
}

export default function AnimalsDetailCarousel(images: any = []) {

  const [imagesState, setImagesState] = useState([])  

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  useEffect(() => {
    setImagesState(images.images)
  }, [])

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
      {imagesState.map((image, index) => (
        <div key={index} className={`keen-slider__slide number-slide${index + 1} ${styles.carousel_item}`}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      
        {/* 
        asi si anda
        <div className="keen-slider__slide number-slide1"><img src={imagesState[0]} /></div>
        <div className="keen-slider__slide number-slide2"><img src={imagesState[1]} /></div>
        <div className="keen-slider__slide number-slide3"><img src={imagesState[2]} /></div>
        <div className="keen-slider__slide number-slide4"><img src={imagesState[3]} /></div> */}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
      {imagesState.length > 1 && imagesState.map((image, index) => (
        <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
        {/* <div className="keen-slider__slide number-slide1">1</div>
        <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div> */}
      </div>
    </>
  )
}
