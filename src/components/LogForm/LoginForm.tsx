"use client"
import React, {useEffect, useState, useRef, useContext} from 'react'
import styles from './LoginForm.module.scss'

import login_illustration from '@/assets/images/login_illustration.svg'
import LoginHuellaIMG from "@/../public/loginhuella.png"
import LoginAnimalIMG from "@/../public/loginAnimal.png"
import Image from 'next/image'
import { Button } from '../Button'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthenticationContext } from '@/context/Authentication'
const supabase = createClientComponentClient()

function LoginForm() {
    const {signIn,signUp} = useContext(AuthenticationContext)
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
    const [emailLogin, setEmailLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')

    const [emailRegister, setEmailRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [confirmPass, setConfirmPass] = useState('')



    const RegistrarUsuario = () =>{
       const data = {
        email:emailRegister,
        password:passRegister,
        rPass:confirmPass
       }
       signUp(data)
    }

    const IniciarSesion = ()=>{
        const data ={
            email: emailLogin,
            password: passLogin
        }
        signIn(data)
    }
  return (
    <div className={styles.formcontainer}>
        <Image src={LoginHuellaIMG} width={673} height={711} alt='huella' className={`${styles.huella} ${isLogin ? styles.loginPosition : ""}`} />
        <form action={RegistrarUsuario} className={`${styles.formcontainer__signup} ${isLogin ? styles.mobileActive: ""}`}>
            <h2>Registrarse</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' onChange={(e) => setEmailRegister(e.target.value)} value={emailRegister}/>
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************' onChange={(e) => setPassRegister(e.target.value)} value={passRegister}/>
            </label>
            <label htmlFor="repeatpassword">
                <input type="password" placeholder='Repite la contraseña' onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass}/>
            </label>
    
            <Button theme='light'>Registrarse</Button>
            <p onClick={()=>setIsLogin(!isLogin)} className={styles.onlymobile}>Ya tienes cuenta?</p>
        </form>

        <form action={IniciarSesion} className={`${styles.formcontainer__signin} ${isLogin ? "" : styles.mobileActive}`}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' onChange={(e) => setEmailLogin(e.target.value)} value={emailLogin} />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************'  onChange={(e) => setPassLogin(e.target.value)} value={passLogin}/>
            </label>

            <Button theme='light'>Iniciar Sesion</Button>
            <p onClick={()=>setIsLogin(!isLogin)} className={styles.onlymobile}>Aun no tienes cuenta?</p>
        </form>

        <div className={`${styles.formcontainer__animation} ${isLogin ? styles.formcontainer__animation__login : styles.formcontainer__animation__signup }`}>
            <div className={styles.formcontainer__animation__text}>
                <h2>No tienes cuenta?</h2>
                <Image src={login_illustration} width={656} height={512} alt='Login Animal' />
                <Button theme='white_bg' onClick={()=>setIsLogin(!isLogin)}>Registrarse</Button>
            </div>
           
            <div className={styles.formcontainer__animation__text}>
                <h2>Ya tienes una cuenta?</h2>
                <Image src={login_illustration} width={656} height={512} alt='Login Animal' />
                <Button theme='white_bg' onClick={()=>setIsLogin(!isLogin)}>Iniciar Sesión</Button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
