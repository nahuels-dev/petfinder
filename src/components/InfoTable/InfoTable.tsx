import styles from "./InfoTable.module.scss"
import {SingleTable} from '../SingleTable/SingleTable'

export const InfoTable: React.FC<{ chip?: boolean, collar?: boolean, size?: string, incapacidades?: boolean, amigable?: boolean, alergias?: string }> = ({ chip = false, collar = false, size = "", incapacidades = false, amigable = false, alergias = "" }) => {
  return (
    <div className={styles.tables} >
      <SingleTable chip={chip} chip_text='Chip' collar={collar} collar_text='Collar' size={size} size_text='Tamaño' incapacidades={incapacidades} incapacidades_text='Incapacidades' amigable={amigable} amigable_text='Amigable' alergias={alergias} alergias_text='Alergias' />
    </div>
  )
}
