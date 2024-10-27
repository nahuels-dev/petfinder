"use client";
import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleLogo from "@/assets/images/google.png";
import { Button } from "../Button";
import { login } from "./actions";
import { useAuth } from "@/context/AuthContext"; 

const Login = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailLogin);
    formData.append("password", passLogin);

    try {
      const user = await login(formData);
      if (user) {
        setUser(user);
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form className={`${styles.formcontainer__signin}`} onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <label htmlFor="email">
        <input
          type="email"
          placeholder="email@domain.com"
          name="email"
          onChange={(e) => setEmailLogin(e.target.value)}
          value={emailLogin}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          placeholder="••••••••••"
          name="password"
          onChange={(e) => setPassLogin(e.target.value)}
          value={passLogin}
        />
      </label>
      <p className={styles.olvideLaContra}>Has olvidado la contraseña?</p>

      <Button theme="light" type="submit">Iniciar Sesión</Button>

      <div className={styles.googleLogin}>
        <Image src={GoogleLogo} width={43} height={44} alt="google Logo" /> Iniciar con Google
      </div>
    </form>
  );
};

export default Login;
