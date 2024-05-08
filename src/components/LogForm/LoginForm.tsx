"use client"
import React, {useEffect, useState} from 'react'
import styles from './LoginForm.module.scss'
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
    const [isLogin, setIsLogin] = useState(true)


  return (
    <div className={styles.formcontainer}>
          <form action="" className={styles.formcontainer__signup}>
        <h2>Sign Up</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' id='email' />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************' id='password' />
            </label>
            <label htmlFor="repeatpassword">
                <input type="password" placeholder='Confirm password' id='repeatpassword' />
            </label>

            <input type="submit" value='Sign up' />
        </form>

        <form action="" className={styles.formcontainer__signin}>
            <h2>Sign In</h2>
            <label htmlFor="email">
                <input type="email" placeholder='email@domain.com' id='email' />
            </label>
            <label htmlFor="password">
                <input type="password" placeholder='************' id='password' />
            </label>

            <input type="submit" value='Login' />
        </form>

        <div className={`${styles.formcontainer__animation} ${isLogin ? styles.formcontainer__animation__login : styles.formcontainer__animation__signup }`}>
            <div className={styles.formcontainer__animation__text}>
            <h2>No tienes cuenta?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, reprehenderit!</p>
            <button onClick={()=>setIsLogin(!isLogin)}>Toggle</button>
            </div>
           
            <div className={styles.formcontainer__animation__text}>
            <h2>Ya tienes una cuenta?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, reprehenderit!</p>
            <button onClick={()=>setIsLogin(!isLogin)}>Toggle</button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
