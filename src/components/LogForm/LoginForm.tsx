"use client"
import React, {useEffect, useState, useRef} from 'react'
import styles from './LoginForm.module.scss'

import login_illustration from '@/assets/images/login_illustration.svg'
import LoginHuellaIMG from "@/../public/loginhuella.png"
import LoginAnimalIMG from "@/../public/loginAnimal.png"
import Image from 'next/image'
import { Button } from '../Button'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()

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
    const [emailLogin, setEmailLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')

    const [emailRegister, setEmailRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const RegistrarUsuario = async () =>{
        if(passRegister.length < 6){
            alert("La contraseña debe ser mayor a 6 caracteres.")
        }else{
            if(confirmPass == passRegister){
                const data ={
                    email: emailRegister,
                    password: passRegister
                }
                const response = await supabase.auth.signUp(data)
                if(response.error){
                    alert("Hubo un error")
                }else{
                    alert("Registrado")
                }
            }else{
                alert("Las contraseñas no coinciden.")
            }
        }
    }
    const IniciarSesion = async ()=>{
        const data ={
            email: emailLogin,
            password: passLogin
        }
        const response = await supabase.auth.signInWithPassword(data)
        console.log(response)
        if(response.error){
            alert("Error al iniciar")
          }else{
            window.localStorage.setItem("session", JSON.stringify(response.data.session))
          }
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
