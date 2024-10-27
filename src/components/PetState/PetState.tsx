import styles from "./PetState.module.scss"
import {PetStateProps} from '../../types/types'
/* 
  props:
    estado: string
      values
        r = retenido
        v = visto
        b = en búsqueda
    texto: string
      values
        Retenido - Visto - En búsqueda
  ejemplo: <PetState estado="r" texto="Retenido" />
*/
export const PetState: React.FC<PetStateProps> = ({estado, texto}) => {
  return <p className={`${styles.petState} ${styles['petState__' + estado]}`}>{texto}</p>
}
