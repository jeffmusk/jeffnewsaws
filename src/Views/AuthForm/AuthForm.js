import React, { useState } from "react";
import "./main.css";
import { useCurrentUser } from "../../Contex/UserContext";

/* import FormSingIn from "../CustomForms/FormSingIn";
import FormSingUp from "../CustomForms/FormSingUp";
import ForgotPassword from "../CustomForms/ForgotPassword"; */

import { Auth } from "aws-amplify";

const initialFormState = {
  email: "",
  password: "",
  authCode: "",
  formType: "signUp",
};

function AuthForm(props) {
  const [formState, setFormState] = useState(initialFormState);
  const { user } = useCurrentUser();

  function onChange(e) {
    e.persist();
    setFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  async function signUp() {
    const { email, password } = formState;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      setFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    } catch (err) {
      console.log(err);
    }
  }
  async function confirmSignUp() {
    const { email, authCode } = formState;
    console.log(email, authCode);
    try {
      await Auth.confirmSignUp(email, authCode);
    } catch (e) {
      console.log(e);
    }
    setFormState(() => ({ ...formState, formType: "signIn" }));
  }

  async function signIn() {
    const { email, password } = formState;
    try {
      await Auth.signIn({
        username: email,
        password,
      });
    } catch (error) {
      console.log(error);
    }

    setFormState(() => ({ ...formState, formType: "signedIn" }));
  }

  const { formType, email, password } = formState;
  return (
    <div className="root">
      <div className="main">
        {formType === "signUp" && (
          <div className="signUp">
            <input
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Contraseña"
            />

            <button onClick={signUp}>Registrarse</button>
            <button
              id="toSignIn"
              onClick={() =>
                setFormState(() => ({
                  ...formState,
                  formType: "signIn",
                }))
              }
            >
              Ya tengo una cuenta
            </button>
          </div>
        )}
        {formType === "confirmSignUp" && (
          <div className="confirmSignUp">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="authCode"
              onChange={onChange}
              placeholder="Codigo de verificacion"
            />
            <button onClick={confirmSignUp}>Verificar </button>
          </div>
        )}

        {formType === "signIn" && (
          <div className="signIn">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Contraseña"
            />
            <button onClick={signIn}>Iniciar sesión</button>
          </div>
        )}
        {formType === "signedIn" && (
          <div className="signedIn">
            <h1>Hola {user && user.attributes.email}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
