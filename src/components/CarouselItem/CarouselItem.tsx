import React from 'react'
import Image from 'next/image'
import petImage from "@/assets/images/petImage.png"
import lastSeenImg from "@/assets/images/lastSeenImg.png"
import styles from "./CarouselItem.module.scss"
import { PetState } from '../PetState/PetState'
import { InfoTable } from '../InfoTable/InfoTable'
import { useState } from 'react'
import "keen-slider/keen-slider.min.css"
interface CarouselItemProps {
	title: any;
	description: any;
	image: any;
	tipo: any
	datePublished: any
	key: any
  }

export const CarouselItem: React.FC<CarouselItemProps> = ({ title, description, image, tipo, datePublished, key }) => {

	const [imgSrc, setImgSrc] = useState(image);


	const resultado = tipo === "Visto" ? "v" : tipo === "Busqueda" ? "b" : "r";

	const handleError = () => {
		setImgSrc(petImage);
	};

	return (
		<div className={`${styles.slide} keen-slider__slide`}>
			<div className={`${styles.slide__content}`}>
				<PetState estado={resultado} texto={tipo} />
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
