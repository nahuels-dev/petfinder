"use client";
import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import Image from "next/image";
import ShowPassImg from "@/assets/images/mostrarContra.png";
import GoogleLogo from "@/assets/images/google.png";
import { Button } from "../Button";
import { signup } from "./actions";
import { useAuth } from "@/context/AuthContext"; 

const SignUpForm = () => {
  const { setUser } = useAuth();
  const [emailRegister, setEmailRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailRegister);
    formData.append("password", passRegister);
    formData.append("name", nameRegister);

    const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement;
    if (imageInput.files?.length) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const user = await signup(formData) as any;
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

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
  return (
    <form className={`${styles.formcontainer__signup}`} onSubmit={handleSignup}>
      <h2>Registrarse</h2>
      <label htmlFor="email">
        <input
          type="email"
          placeholder="email@domain.com"
          name="email"
          onChange={(e) => setEmailRegister(e.target.value)}
          value={emailRegister}
        />
      </label>
      <label htmlFor="name">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          name="name"
          onChange={(e) => setNameRegister(e.target.value)}
          value={nameRegister}
        />
      </label>
      <label htmlFor="password">
        <input
          id="registerPassword"
          type="password"
          placeholder="••••••••••"
          name="password"
          onChange={(e) => setPassRegister(e.target.value)}
          value={passRegister}
        />
        <Image src={ShowPassImg} width={51} height={34} alt="mostrar contraseña" className={styles.showPass} onClick={ShowPass}/>
      </label>
      <label htmlFor="repeatpassword">
        <input
          id="registerConfirmationPassword"
          type="password"
          placeholder="••••••••••"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        />
        <Image src={ShowPassImg} width={51} height={34} alt="mostrar contraseña" className={styles.showPass} onClick={ShowConfirmationPass}/>
      </label>
      <label htmlFor="image">
        <input type="file" name="image" required />
      </label>

      <Button theme="light" type="submit">Registrarse</Button>

      <div className={styles.googleLogin}>
        <Image src={GoogleLogo} width={43} height={44} alt="google Logo" /> Regístrate con Google
      </div>
    </form>
  );
};

export default SignUpForm;
