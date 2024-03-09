import React from "react";
import Logo from "../../assets/Logo.svg";
import "../Login/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  function validate() {
    if (!usernameRef.current.value.trim().length) {
      alert("username kiritilishi shart !!!");
      usernameRef.current.focus();
      usernameRef.current.value = "";
      return false;
    }
    if (!passwordRef.current.value.trim().length) {
      alert("password kiritilishi shart !!!");
      passwordRef.current.focus();
      passwordRef.current.value = "";
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
        email: "",
        password: `${passwordRef.current.value}`,
      };
      fetch(`${import.meta.env.VITE_API + "auth/signin"}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        })
        .catch((error) => {
          alert("Bunday foydalanuvchi mavjud emas");
          // console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
        });
    }
  }

  return (
    <div className="containerLogin">
      <div className="registerLogo">
        <img src={Logo} alt="Logo icon" />
      </div>
      <div className="formWrapper">
        <h3>Login</h3>
        <form className="form">
          <input ref={usernameRef} type="text" placeholder="Usename" />
          <input ref={passwordRef} type="Password" placeholder="Password" />
          <button onClick={hendleSubmit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Login to your account"}
          </button>
          <p>
            Already have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
