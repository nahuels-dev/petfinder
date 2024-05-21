"use client"
import React, {useEffect, useState, useRef, useContext} from 'react'
import styles from './LoginForm.module.scss'

import login_illustration from '@/assets/images/login_illustration.svg'
import LoginHuellaIMG from "@/assets/images/loginhuella.png"
import GoogleLogo from "@/assets/images/google.png"
import ShowPassImg from "@/assets/images/mostrarContra.png" 
import Image from 'next/image'
import { Button } from '../Button'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthenticationContext } from '@/context/Authentication'

import { useRouter } from 'next/navigation'
const supabase = createClientComponentClient()

function LoginForm() {
    const {signIn,signUp, isLoggedIn} = useContext(AuthenticationContext)
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
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [emailLogin, setEmailLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')

    const [emailRegister, setEmailRegister] = useState('')
    const [nameRegister, setNameRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [emailRegisterError, setEmailRegisterError] = useState(false)
    const [nameRegisterError, setNameRegisterError] = useState(false)
    const [passRegisterError, setPassRegisterError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)



    const RegistrarUsuario = () =>{
        let error = false;
        if(emailRegister == ""){
            setEmailRegisterError(true)
            error = true;
        }
        if(nameRegister == ""){
            setNameRegisterError(true)
            error = true;
        }
        if(passRegister == ""){
            setPassRegisterError(true)
            error = true;
        }
        if(confirmPass == ""){
            setConfirmPassError(true)
            error = true;
        }
        if(error){
            return
        }
       const data = {
        email:emailRegister,
        password:passRegister,
        rPass:confirmPass,
        name: nameRegister
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

    const RemoveError = (errorStateSetter: any, inputStateSetter: any, value: any) =>{
        inputStateSetter(value)
        if(value != ""){
            errorStateSetter(false)
        }else{
            errorStateSetter(true)
        }
    }

    const ShowPass = () =>{
        const input = document.querySelector("#registerPassword") as HTMLInputElement
        if(input?.type == "password"){
            input.type = "text"
        }else{
            input.type = "password"
        }
    }
    const ShowConfirmationPass = () =>{
        const input = document.querySelector("#registerConfirmationPassword") as HTMLInputElement
        if(input?.type == "password"){
            input.type = "text"
        }else{
            input.type = "password"
        }
    }

    const googleLogin = ()=>{
        supabase.auth.signInWithOAuth({
            provider:'google'
        })
    }

    useEffect(()=>{
        if(isLoggedIn){
            router.back()
        }
    },[isLoggedIn])
  return (
    <div className={styles.formcontainer}>
        <Image src={LoginHuellaIMG} width={673} height={711} alt='huella' className={`${styles.huella} ${isLogin ? styles.loginPosition : ""}`} />
        <form action={RegistrarUsuario} className={`${styles.formcontainer__signup} ${isLogin ? styles.mobileActive: ""}`}>
            <h2>Registrarse</h2>
            <label htmlFor="email" className={`${emailRegisterError ? styles.error : ""}`}>
                Email
                <input type="email" placeholder='email@domain.com' onChange={(e) => RemoveError(setEmailRegisterError,setEmailRegister, e.target.value) } value={emailRegister}/>
            </label>
            <label htmlFor="name" className={`${nameRegisterError ? styles.error : ""}`}>Nombre
                <input type="text" placeholder='Ingresa tu nombre' onChange={(e) => RemoveError(setNameRegisterError,setNameRegister, e.target.value) } value={nameRegister} />
            </label>
            <label htmlFor="password" className={`${passRegisterError ? styles.error : ""}`}>Contraseña
                <input id='registerPassword' type="password" placeholder='••••••••••' onChange={(e) => RemoveError(setPassRegisterError,setPassRegister, e.target.value) } value={passRegister}/>
                <Image src={ShowPassImg} width={51} height={34}  onClick={ShowPass} alt='mostrar contraseña' className={styles.mostrarContra} />
            </label>
            <label htmlFor="repeatpassword" className={`${confirmPassError ? styles.error : ""}`}>Repite la Contraseña
                <input id='registerConfirmationPassword' type="password" placeholder='••••••••••' onChange={(e) => RemoveError(setConfirmPassError,setConfirmPass, e.target.value) } value={confirmPass} />
                <Image width={51} height={34} src={ShowPassImg} alt='mostrar contraseña' className={styles.mostrarContra} onClick={ShowConfirmationPass} />
            </label>
    
            <Button theme='light'>Registrarse</Button>
            <div className={styles.googleLogin} onClick={()=> googleLogin()}>
                <Image src={GoogleLogo} width={43} height={44} alt='google Logo' /> Registate con Google
            </div>
            <p onClick={()=>setIsLogin(!isLogin)} className={styles.onlymobile}>Ya tienes cuenta?</p>
        </form>

        <form action={IniciarSesion} className={`${styles.formcontainer__signin} ${isLogin ? "" : styles.mobileActive}`}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' onChange={(e) => setEmailLogin(e.target.value)} value={emailLogin} />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='••••••••••'  onChange={(e) => setPassLogin(e.target.value)} value={passLogin}/>
            </label>
            <p className={styles.olvideLaContra}>Has olvidado la contraseña?</p>

            <Button theme='light'>Iniciar Sesion</Button>
            <div className={styles.googleLogin}>
                <Image src={GoogleLogo} width={43} height={44} alt='google Logo' /> Iniciar con Google
            </div>
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
