import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react"; */

import Home from "./Views/Home/Home";
import Login from "./Views/Login/Login";
import Profile from "./Views/Profile/Profile";
import SingUp from "./Views/SingUp/SingUp";
import NavBar from "./Layouts/NavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />

        {/* <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignUp
            slot="sign-up"
            headerText="Crea una cuenta"
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
              },
            ]}
          ></AmplifySignIn>
          <AmplifyForgotPassword
            headerText="Recuperar contraseña"
            slot="forgot-password"
          ></AmplifyForgotPassword>
        </AmplifyAuthenticator>
         */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/singup">
            <SingUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
