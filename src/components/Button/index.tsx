import React from 'react'
import styles from './Button.module.scss'
export function Button({children,className,size,theme,onClick,formAction, type}:{
    children:React.ReactNode,
    className?:string,
    size?:string,
    theme?:string,
    onClick?: (e?:any)=> any,
    formAction?: string,
    type?: any
}){
return(
    <button 
        className={`${styles.button} ${className ? className : ''} ${styles[theme || 'default']} ${styles[size || 'big']}`} 
        onClick={onClick} 
        formAction={formAction}
        type={type}
        >
        {children}
    </button>
)
} 