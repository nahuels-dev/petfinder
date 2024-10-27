"use client";
import React, { useState, useEffect } from "react";
import styles from "./LoginForm.module.scss";
import Image from "next/image";
import login_illustration from "@/assets/images/login_illustration.svg";
import LoginHuellaIMG from "@/assets/images/loginhuella.png";
import Login from "./Login";
import SignUpFrom from "./SignUpFrom";
import { Button } from "../Button";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false)
  
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(`.${styles.container}`);

    sign_up_btn?.addEventListener("click", () => {
      container?.classList.add(styles["sign-up-mode"]);
    });

    sign_in_btn?.addEventListener("click", () => {
      container?.classList.remove(styles["sign-up-mode"]);
    });
  }, []);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setHasInteracted(true);
  };

  return (
    <div className={styles.formcontainer}>
      <Image
        src={LoginHuellaIMG}
        width={673}
        height={711}
        alt="huella"
        className={`${styles.paw} ${isLogin ? styles.loginPosition : ""}`}
      />
      
      <SignUpFrom />
      
      <Login />  

      <div className={`${styles.formcontainer__animation} ${
          hasInteracted
            ? isLogin
              ? styles.formcontainer__animation__login
              : styles.formcontainer__animation__signup
            : ""
        }`}>
        <div className={styles.formcontainer__animation__text}>
          <h2>{isLogin ? "No tienes cuenta?" : "Ya tienes una cuenta?" }</h2>
          <Image src={login_illustration} width={656} height={512} alt="Login Animal" />
          <Button className={styles.toggleBtn} theme='white_bg' onClick={() => handleToggle()}>
            {isLogin ? "Registrarse" : "Iniciar Sesión"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
