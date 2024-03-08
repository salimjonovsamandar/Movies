import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../assets/Logo.svg";
import "../Register/index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repasswordRef = useRef("");

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validate() {
    if (!usernameRef.current.value.trim().length) {
      alert("username kiritilishi shart !!!");
      usernameRef.current.focus();
      usernameRef.current.value = "";
      return false;
    }
    if (!emailRef.current.value.trim().length) {
      alert("Email kiritilishi shart !!!");
      emailRef.current.focus();
      emailRef.current.value = "";
      return false;
    }

    const email = emailRef.current.value;
    if (!validateEmail(email)) {
      alert("Emailning to'g'ri formatda kiritilishi shart!!!");
      emailRef.current.focus();
      emailRef.current.value = "";
      return false;
    }
    if (!passwordRef.current.value.trim().length) {
      alert("password kiritilishi shart !!!");
      passwordRef.current.focus();
      passwordRef.current.value = "";
      return false;
    }
    if (!repasswordRef.current.value.trim().length) {
      alert("password kiritilishi shart !!!");
      repasswordRef.current.focus();
      repasswordRef.current.value = "";
      return false;
    }
    if (passwordRef.current.value != repasswordRef.current.value) {
      alert("Parollar bir biriga mos emas!!");
      passwordRef.current.focus();
      repasswordRef.current.value = "";
      return false;
    }
    return true;
  }

  function hendleSubmit(e) {
    e.preventDefault();
    const isValidate = validate();

    if (isValidate) {
      setIsLoading(true);
      let data = {
        username: `${usernameRef.current.value}`,
        email: `${emailRef.current.value}`,
        password: `${passwordRef.current.value}`,
      };

      fetch(`${import.meta.env.VITE_API + "auth/signup"}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
        });
    }
  }

  return (
    <div className="container">
      <div className="registerLogo">
        <img src={Logo} alt="Logo icon" />
      </div>
      <div className="formWrapper">
        <h3>Sign Up</h3>
        <form className="form">
          <input ref={usernameRef} type="text" placeholder="Usename" />
          <input ref={emailRef} type="email" placeholder="Email address" />
          <input ref={passwordRef} type="Password" placeholder="Password" />
          <input
            ref={repasswordRef}
            type="Password"
            placeholder="Repeat password"
          />
          <button onClick={hendleSubmit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Create an account"}
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
