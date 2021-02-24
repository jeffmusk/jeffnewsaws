import React from "react";
import {
  AmplifyAuthenticator,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react";

export default function ForgotPassword() {
  return (
    <AmplifyForgotPassword
      headerText="Recuperar contraseña"
      slot="forgot-password"
      sendButtonText="Enviar Codigo"
      formFields={[
        {
          type: "email",
          label: "Email",
          placeholder: "usuario@email.com",
          required: true,
        },
      ]}
    ></AmplifyForgotPassword>
  );
}
