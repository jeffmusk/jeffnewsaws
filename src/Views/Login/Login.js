import React, { useState } from "react";

import "./login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    console.log(email, password);

    /* const { dispatch , email, pass } = this.props;
        dispatch(loginUser(email, pass, () => this.props.history.push("/panel"))); */
  };

  const handlelogout = () => {
    console.log("cerrar sesion");
  };

  return (
    <div className="main">
      <div className="containerLogin">
        <input type="text" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="text"
          placeholder="contraseña"
          onChange={handlePasswordChange}
        />

        <button id="singup" onClick={handleSubmit}>
          Iniciar sesion
        </button>

        <button id="logout" onClick={handlelogout}>
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}

export default Login;
