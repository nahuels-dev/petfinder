import styles from "./InfoTable.module.scss"
import {SingleTable} from '../SingleTable/SingleTable'

/* Este componente tiene que recibir los datos (ahora hardcodeados) de la API que va a desarrollar patroncito */
export const InfoTable: React.FC = () => {
  return (
    <div className={styles.tables} >
      <SingleTable chip_incapacidades={true} chip_incapacidades_text='Chip' collar_amigable={true} collar_amigable_text='Collar' size_alergias='5kg' size_alergias_text='Tamaño' />
      <SingleTable chip_incapacidades={true} chip_incapacidades_text='Incapacidades' collar_amigable={false} collar_amigable_text='Amigable' size_alergias='Si' size_alergias_text='Alergias' />
    </div>
  )
}
