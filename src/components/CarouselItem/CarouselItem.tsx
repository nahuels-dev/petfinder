import React from 'react'
import Image from 'next/image'
import petImage from "@/assets/images/petImage.png"
import lastSeenImg from "@/assets/images/lastSeenImg.png"
import styles from "./CarouselItem.module.scss"
import { PetState } from '../PetState/PetState'
import { InfoTable } from '../InfoTable/InfoTable'
import { useState } from 'react'
import "keen-slider/keen-slider.min.css"

import FavoriteImg from "@/assets/images/favoriteFullIcon.png"
import NoFavoriteImg from "@/assets/images/favoriteEmptyIcon.png"
interface CarouselItemProps {
	title: any;
	description: any;
	image: any;
	tipo: any
	datePublished: any
  }

export const CarouselItem: React.FC<CarouselItemProps> = ({ title, description, image, tipo, datePublished}) => {

	const [imgSrc, setImgSrc] = useState(image);


	const resultado = tipo === "Visto" ? "v" : tipo === "Busqueda" ? "b" : "r";

	const handleError = () => {
		setImgSrc(petImage);
	};


	const favorite = (e: any) => {
		// Nahuel boton clickea pero tambien te tira para detalles
		e.stopPropagation()
		console.log("favorite function")
	}

	return (
		<div className={`${styles.slide} keen-slider__slide`}>
			<div className={`${styles.slide__content}`}>
				<PetState estado={resultado} texto={tipo} />
				<div className={styles.favoriteImg} onClick={(e) => favorite(e)}>
				{/* IF FAVORITE */}
					<Image className={`${styles.slide__content__img}`} src={NoFavoriteImg} width={33} height={31} alt="favorite img" onError={handleError} />
				</div>

				<Image className={`${styles.slide__content__img}`} src={imgSrc} width={834} height={536} alt="pet image" onError={handleError} />
				
				<div className={`${styles.slide__content__copy}`}>
					<h4>{title}</h4>
					<p>{description} </p>
					<InfoTable />
					<span className={`${styles.slide__content__copy__lastSeen}`}>
						<Image className={`${styles.slide__content__copy__lastSeen__img}`} src={lastSeenImg} width={36} height={36} alt="Last seen clock" />
						Visto por última vez en Aguada - {datePublished}
					</span>
				</div>
			</div>
		</div>
	)
}
