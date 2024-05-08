"use client"
import React, {useEffect, useState} from 'react'
import styles from './LoginForm.module.scss'

import LoginHuellaIMG from "@/../public/loginhuella.png"
import LoginAnimalIMG from "@/../public/loginAnimal.png"
import Image from 'next/image'
import { Button } from '../Button'

function LoginForm() {
    useEffect(()=>{

        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        
        sign_up_btn?.addEventListener("click", () => {
            container?.classList.add("sign-up-mode");
        });
        
        sign_in_btn?.addEventListener("click", () => {
            container?.classList.remove("sign-up-mode");
        });
    },[])
    const [isLogin, setIsLogin] = useState(false)

    const RegistrarUsuario = (e:any) =>{
        console.log("Register")
    }

    const IniciarSesion =()=>{
        console.log("Login")
    }
  return (
    <div className={styles.formcontainer}>
        <Image src={LoginHuellaIMG} width={673} height={711} alt='huella' className={`${styles.huella} ${isLogin ? styles.loginPosition : ""}`} />
        <form action={(e) => RegistrarUsuario(e)} className={`${styles.formcontainer__signup} ${isLogin ? styles.movileActive: ""}`}>
            <h2>Registrarse</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' id='email' />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************' id='password' />
            </label>
            <label htmlFor="repeatpassword">
                <input type="password" placeholder='Repite la contraseña' id='repeatpassword' />
            </label>
    
            <Button theme='light' >Registrarse</Button>
            <p onClick={()=>setIsLogin(!isLogin)} className={styles.onlyMovile}>Ya tienes cuenta?</p>
        </form>

        <form action={IniciarSesion} className={`${styles.formcontainer__signin} ${isLogin ? "" : styles.movileActive}`}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' id='emailLogin' />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************' id='passwordLogin' />
            </label>

            <Button theme='light'>Iniciar Sesion</Button>
            <p onClick={()=>setIsLogin(!isLogin)} className={styles.onlyMovile}>Aun no tienes cuenta?</p>
        </form>

        <div className={`${styles.formcontainer__animation} ${isLogin ? styles.formcontainer__animation__login : styles.formcontainer__animation__signup }`}>
            <Image src={LoginHuellaIMG} width={673} height={711} alt='huella' className={`${styles.huella} ${isLogin ? styles.loginPosition : ""}`} />
            <div className={styles.formcontainer__animation__text}>
                <h2>No tienes cuenta?</h2>
                <Image src={LoginAnimalIMG} width={656} height={512} alt='Login Animal' />
                <Button theme='white_bg' onClick={()=>setIsLogin(!isLogin)}>Registrarse</Button>
            </div>
           
            <div className={styles.formcontainer__animation__text}>
                <h2>Ya tienes una cuenta?</h2>
                <Image src={LoginAnimalIMG} width={656} height={512} alt='Login Animal' />
                <Button theme='white_bg' onClick={()=>setIsLogin(!isLogin)}>Iniciar Sesión</Button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
