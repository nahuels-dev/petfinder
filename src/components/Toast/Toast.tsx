"use client"
import Swal from 'sweetalert2'
import styles from './Toast.module.scss'

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  
  ;(async () => {
    await Toast.fire({
      icon: 'success',
      title: 'Success',
    })
    await Toast.fire({
      icon: 'error',
      title: 'Error',
    })
    await Toast.fire({
      icon: 'warning',
      title: 'Warning',
    })
    await Toast.fire({
      icon: 'info',
      title: 'Info',
    })
    await Toast.fire({
      icon: 'question',
      title: 'Question',
    })
  })()

export default Toast
