"use client"
import React, { useContext } from 'react'
import styles from "./FindYourPet.module.scss";
import { DialogContext } from '@/context/Dialog';

function FindYourPet() {
    const { closeDialog } = useContext(DialogContext)
  return (
    <>
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
        <div onClick={closeDialog} className={`${styles.primaryModal_closebtn}`}></div>
        </>
    )
}

export default FindYourPet
