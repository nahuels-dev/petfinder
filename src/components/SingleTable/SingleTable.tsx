import styles from "./SingleTable.module.scss"
import {TableProps} from '../../types/types'

export const SingleTable: React.FC<TableProps> = ({ chip, chip_text, collar, collar_text, size, size_text, incapacidades,incapacidades_text, amigable, amigable_text, alergias, alergias_text }) => {
  
  return (
    <table className={styles.tab}>
      <tbody>
        <tr>
          <th scope="row">{chip_text}</th>
          <td>{chip ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{collar_text}</th>
          <td>{collar ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{size_text}</th>
          <td>{ size }</td>
        </tr>
        <tr>
          <th scope="row">{incapacidades_text}</th>
          <td>{incapacidades ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{amigable_text}</th>
          <td>{amigable ? 'Si' : 'No'}</td>
        </tr>
        <tr>
          <th scope="row">{alergias_text}</th>
          <td>{ alergias }</td>
        </tr>
      </tbody>
    </table>
  )
}
