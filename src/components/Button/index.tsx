import React from 'react'
import styles from './Button.module.scss'
export function Button({children,className,size,theme,onClick}:{
    children:React.ReactNode,
    className?:string,
    size?:string,
    theme?:string,
    onClick?: ()=> any
}){
return(
    <button className={`${styles.button} ${className ? className : ''} ${styles[theme || 'default']} ${styles[size || 'big']}`} onClick={onClick}>
        {children}
    </button>
)
} 