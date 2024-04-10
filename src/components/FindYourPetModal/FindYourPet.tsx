"use client"
import React, { useEffect, useRef } from 'react'
import styles from "./FindYourPet.module.scss";

function FindYourPet() {

    const dialog = useRef<HTMLDialogElement>(null)

    const closeModal = () =>{
        if(dialog.current){
            dialog.current.close()
        }
    }

    useEffect(() => {
        dialog.current?.showModal()
    }, [])

  return (
    <dialog className={`${styles.primaryModal}`} ref={dialog}>
        <p>Encuentra a tu mascota</p>
        <form method="dialog" className={`${styles.primaryModal_form}`}>
            <div>
                <label>
                    <input placeholder='Zona'type='text' />
                </label>
                <label>
                    <input placeholder='Raza'type='text' />
                </label>
            </div>
            <div>
                <label>
                    <input placeholder='Fecha' type='date'/>
                </label>
                <button>Buscar</button>
            </div>
        </form>
        <div onClick={closeModal} className={`${styles.primaryModal_closebtn}`}></div>
    </dialog>
  )
}

export default FindYourPet
