import React, { useEffect } from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";

export default function FormSingIn(props) {
  const { handleSignIn } = props;

  console.log(props);
  return (
    <AmplifySignIn
      slot="sign-in"
      usernameAlias="email"
      headerText="Iniciar sesión"
      submitButtonText="Iniciar sesión"
      formFields={[
        {
          type: "email",
          label: "Email",
          placeholder: "usuario@email.com",
          required: true,
        },
        {
          type: "password",
          label: "Contraseña",
          placeholder: "contraseña",
          required: true,
          hint: null,
        },
      ]}
    >
      <div slot="secondary-footer-content">
        <p
          className="clickable"
          style={{ marginBottom: "10px" }}
          onClick={() => {
            handleSignIn("signup");
          }}
        >
          Registrarse
        </p>
        <p className="clickable">Olvide mi contraseña</p>
      </div>
    </AmplifySignIn>
  );
}
