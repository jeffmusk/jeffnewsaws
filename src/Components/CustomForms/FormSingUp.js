import React from "react";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

export default function FormSingUp() {
  return (
    <AmplifySignUp
      slot="sign-up"
      headerText="Crea una cuenta"
      submitButtonText="registrarme"
      usernameAlias="email"
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
          placeholder: "Minimo 6 caracteres",
          required: true,
        },
      ]}
    />
  );
}
