"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Swal from 'sweetalert2'

type AuthType = {
    signIn: (data: SignInData) => void,
    signUp: (data: SignUpData) => void,
    logOut: () => void,
    isLoggedIn: boolean
}

type SignUpData = {
    email: string,
    password: string,
    rPass: string
}

type SignInData = {
    email: string,
    password: string
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


    const signIn = async (data: SignInData) => {
        const response = await supabase.auth.signInWithPassword(data)
        if (response.error) {
            await Toast.fire({
                icon: 'error',
                title: 'Error al iniciar',
            })
        } else {
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
        } else {
            if (data.password == data.rPass) {
                const userData = {
                    email: data.email,
                    password: data.password
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
    }

    const methods = {
        signIn,
        signUp,
        logOut,
        isLoggedIn
    }

    return <AuthenticationContext.Provider value={methods}>{children}</AuthenticationContext.Provider>
}

export { AuthProvider, AuthenticationContext }