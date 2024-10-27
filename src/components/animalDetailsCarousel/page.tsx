import React, { useEffect, useState, useRef } from "react";
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./AnimalDetailsCarousel.module.scss";

// Plugin para manejar thumbnails
function ThumbnailPlugin(
  mainRef: React.MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const AutoPlayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000); // Cambia el tiempo aquí (3000ms = 3 segundos)
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function AnimalsDetailCarousel({ images = [] }: { images: string[] }) {
  const [imagesState, setImagesState] = useState<string[]>([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  
  // Determinamos si hay más de una imagen
  const hasMultipleImages = images.length > 1;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 1,
        spacing: 0,
      },
      loop: hasMultipleImages, // Solo loop si hay más de una imagen
    },
    hasMultipleImages ? [AutoPlayPlugin] : [] // Solo añadir el plugin de autoplay si hay más de una imagen
  );

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  useEffect(() => {
    if (images && images.length > 0) {
      setImagesState(images);
    }
  }, [images]);

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    if (aspectRatio > 1) {
      imgElement.setAttribute("data-aspect-ratio", "wide"); // Imagen más ancha que alta
    } else {
      imgElement.setAttribute("data-aspect-ratio", "tall"); // Imagen más alta que ancha
    }
  };

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update(); // Actualiza el carrusel una vez que las imágenes están cargadas
    }
  }, [imagesState]);

  return (
    <>
      <div
        ref={sliderRef}
        className={`keen-slider ${styles.container}`}
        style={{ visibility: isImagesLoaded ? "visible" : "hidden" }} // Escondemos hasta que las imágenes estén cargadas
      >
        {imagesState.map((image, index) => (
          <div key={index} className={`keen-slider__slide number-slide${index + 1} ${styles.carousel_item}`}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onLoad={(e) => {
                handleImageLoad(e.currentTarget);
                if (index === imagesState.length - 1) setIsImagesLoaded(true); // Verificar si es la última imagen
              }}
            />
          </div>
        ))}
      </div>

      {hasMultipleImages && isImagesLoaded && (
        <div ref={thumbnailRef} className={`keen-slider thumbnail ${styles.thumbnails}`}>
          {imagesState.map((image, index) => (
            <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onLoad={(e) => handleImageLoad(e.currentTarget)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
