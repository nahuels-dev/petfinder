import React from 'react'
import Image from 'next/image'
import petImage from "@/assets/images/petImage.png"
import lastSeenImg from "@/assets/images/lastSeenImg.png"
import styles from "./CarouselItem.module.scss"
import { PetState } from '../PetState/PetState'
import { InfoTable } from '../InfoTable/InfoTable'
import { useState } from 'react'
interface CarouselItemProps {
	title: any;
	description: any;
	image: any;
	tipo: any
  }

export const CarouselItem: React.FC<CarouselItemProps> = ({ title, description, image, tipo }) => {

	const [imgSrc, setImgSrc] = useState(image);


	const resultado = tipo === "Visto" ? "v" : tipo === "Busqueda" ? "b" : "r";

	const handleError = () => {
		//cuando no tenga imagen le ponemos una por defecto
		setImgSrc(petImage);
	};

	return (
		<div className={`${styles.embla__slide}`}>
			<div className={`${styles.embla__slide__content}`}>
				<PetState estado={resultado} texto={tipo} />
				<Image className={`${styles.embla__slide__content__img}`} src={imgSrc} width={834} height={536} alt="pet image" onError={handleError} />
				<div className={`${styles.embla__slide__content__copy}`}>
					<h4>{title}</h4>
					<p>{description} </p>
					<InfoTable />
					<span className={`${styles.embla__slide__content__copy__lastSeen}`}>
						<Image className={`${styles.embla__slide__content__copy__lastSeen__img}`} src={lastSeenImg} width={36} height={36} alt="Last seen clock" />
						Visto por última vez en Aguada - 4/3/24
					</span>
				</div>
			</div>
		</div>
	)
}
