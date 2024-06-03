"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Swal from 'sweetalert2'

type AuthType = {
    signIn: (data: SignInData) => void,
    signUp: (data: SignUpData) => Promise<boolean>,
    logOut: () => void,
    isLoggedIn: boolean,
    checkSession: any
}

type SignUpData = {
    email: string,
    password: string,
    rPass: string
    name: string
    image: string
    role: string
}

type SignInData = {
    email: string,
    password: string,
}


const AuthenticationContext = createContext({} as AuthType)

const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const supabase = createClientComponentClient()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
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

    useEffect(()=>{
        let storageSession = checkSession() as any
        if(storageSession){
            storageSession = JSON.parse(storageSession)
            signInWithToken(storageSession)
        }
    },[])

    const signInWithToken = async (token:any)=>{
        const { data, error } = await supabase.auth.setSession({
            access_token: token.access_token,
            refresh_token: token.refresh_token
          })
        if(!error){
            setIsLoggedIn(true)
        }
    }   

    const checkSession = () => {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('session' + '=')) {
                return cookie.substring('session'.length + 1);
            }
        }
        return null;
    }

    const signIn = async (data: SignInData) => {
        const response = await supabase.auth.signInWithPassword(data)
        if (response.error) {
            await Toast.fire({
                icon: 'error',
                title: 'Error al iniciar',
            })
        } else {
            console.log(response.data.user.user_metadata.full_name)
            const sessionCookie = response.data.session
            document.cookie = `session=${JSON.stringify(sessionCookie)}; Secure`
            const expirationDate = new Date()
            expirationDate.setDate(expirationDate.getDate() + 1)
            document.cookie = `sessionExpiration=${expirationDate.toUTCString()}; Secure`
            await Toast.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
            })

            setIsLoggedIn(true)
        }
    }

    const signUp = async (data: SignUpData) => {
        if (data.password.length < 6) {
            await Toast.fire({
                icon: 'error',
                title: 'La contraseña debe ser mayor a 6 caracteres.',
            })
            return false
        } else {
            if (data.password == data.rPass) {
                const userData = {
                    email: data.email,
                    password: data.password,
                    options: {
                        data: {
                            full_name: data.name,
                            age: 27,
                            image: data.image,
                            role: data.role
                        }
                    }
                }
                const response = await supabase.auth.signUp(userData)
                if (response.error) {
                    await Toast.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                    })
                } else {
                    await Toast.fire({
                        icon: 'success',
                        title: 'Registrado correctamente',
                    })
                }
            } else {
                await Toast.fire({
                    icon: 'error',
                    title: 'Las contraseñas no coinciden.',
                })
            }
            return true
        }
    }

    const logOut = async () => {
        await supabase.auth.signOut()
        document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`;
        await Toast.fire({
            icon: 'success',
            title: 'Cerraste sesion correctamente',
        })
        setIsLoggedIn(false)
        location.reload()
    }

    const methods = {
        signIn,
        signUp,
        logOut,
        isLoggedIn,
        checkSession
    }

    return <AuthenticationContext.Provider value={methods}>{children}</AuthenticationContext.Provider>
}

export { AuthProvider, AuthenticationContext }