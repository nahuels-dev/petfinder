import styles from "./InfoTable.module.scss"
import {SingleTable} from '../SingleTable/SingleTable'

/* Este componente tiene que recibir los datos (ahora hardcodeados) de la API que va a desarrollar patroncito */
export const InfoTable: React.FC = () => {
  return (
    <div className={styles.tables} >
      <SingleTable chip={true} chip_text='Chip' collar={true} collar_text='Collar' size='5kg' size_text='Tamaño' incapacidades={true} incapacidades_text='Incapacidades' amigable={false} amigable_text='Amigable' alergias='Si' alergias_text='Alergias' />
    </div>
  )
}
