import styles from "./SingleTable.module.scss"
import {TableProps} from '../../types/types'

export const SingleTable: React.FC<TableProps> = ({ chip_incapacidades, chip_incapacidades_text, collar_amigable, collar_amigable_text, size_alergias, size_alergias_text }) => {
  
  return (
    <table className={styles.tab}>
      <tbody>
        <tr>
          <th scope="row">{chip_incapacidades_text}</th>
          <td>{chip_incapacidades ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{collar_amigable_text}</th>
          <td>{collar_amigable ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{size_alergias_text}</th>
          <td>{ size_alergias }</td>
        </tr>
      </tbody>
    </table>
  )
}
