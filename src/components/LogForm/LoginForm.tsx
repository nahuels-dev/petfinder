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
    // <div className='contenedorForm'>
    //     <div className="container">
    //         <div className="forms-container">
    //             <div className="signin-signup">
    //             <form action="#" className="sign-in-form">
    //                 <h2 className="title">Sign in</h2>
    //                 <div className="input-field">
    //                 <i className="fas fa-user"></i>
    //                 <input type="text" placeholder="Username" />
    //                 </div>
    //                 <div className="input-field">
    //                 <i className="fas fa-lock"></i>
    //                 <input type="password" placeholder="Password" />
    //                 </div>
    //                 <input type="submit" value="Login" className="btn solid" />
    //                 <p className="social-text">Or Sign in with social platforms</p>
    //                 <div className="social-media">
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-facebook-f"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-twitter"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-google"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-linkedin-in"></i>
    //                 </a>
    //                 </div>
    //             </form>
    //             <form action="#" className="sign-up-form">
    //                 <h2 className="title">Sign up</h2>
    //                 <div className="input-field">
    //                 <i className="fas fa-user"></i>
    //                 <input type="text" placeholder="Username" />
    //                 </div>
    //                 <div className="input-field">
    //                 <i className="fas fa-envelope"></i>
    //                 <input type="email" placeholder="Email" />
    //                 </div>
    //                 <div className="input-field">
    //                 <i className="fas fa-lock"></i>
    //                 <input type="password" placeholder="Password" />
    //                 </div>
    //                 <input type="submit" className="btn" value="Sign up" />
    //                 <p className="social-text">Or Sign up with social platforms</p>
    //                 <div className="social-media">
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-facebook-f"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-twitter"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-google"></i>
    //                 </a>
    //                 <a href="#" className="social-icon">
    //                     <i className="fab fa-linkedin-in"></i>
    //                 </a>
    //                 </div>
    //             </form>
    //             </div>
    //         </div>

    //         <div className="panels-container">
    //             <div className="panel left-panel">
    //             <div className="content">
    //                 <h3>New here ?</h3>
    //                 <p>
    //                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
    //                 ex ratione. Aliquid!
    //                 </p>
    //                 <button className="btn transparent" id="sign-up-btn">
    //                 Sign up
    //                 </button>
    //             </div>
    //             <img src="img/log.svg" className="image" alt="" />
    //             </div>
    //             <div className="panel right-panel">
    //             <div className="content">
    //                 <h3>One of us ?</h3>
    //                 <p>
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
    //                 laboriosam ad deleniti.
    //                 </p>
    //                 <button className="btn transparent" id="sign-in-btn">
    //                 Sign in
    //                 </button>
    //             </div>
    //             <img src="img/register.svg" className="image" alt="" />
    //             </div>
    //         </div>
    //     </div>
    // </div>
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
