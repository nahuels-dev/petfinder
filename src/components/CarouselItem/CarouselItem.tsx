import React from 'react'
import Image from 'next/image'
import petImage from "../../../public/petImage.png"
import lastSeenImg from "../../../public/lastSeenImg.png"
import styles from "./CarouselItem.module.scss"
import { PetState } from '../PetState/PetState'
import { InfoTable } from '../InfoTable/InfoTable'

export const CarouselItem: React.FC = () => {
	return (
		<div className={`${styles.embla__slide}`}>
			<div className={`${styles.embla__slide__content}`}>
				<PetState estado="r" texto="Retenido" />
				<Image className={`${styles.embla__slide__content__img}`} src={petImage} width={834} height={536} alt="pet image" />
				<div className={`${styles.embla__slide__content__copy}`}>
					<h4>Roku perdido en centro</h4>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut, provident officia sed quasi iusto aperiam corporis, numquam reprehenderit molestias a enim voluptates ducimus voluptatem </p>
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
