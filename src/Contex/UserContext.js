import React, { useEffect, useMemo, useState, createContext } from "react";
import { Hub, Auth } from "aws-amplify";
import SpinnerApp from "../Components/Spinner/SpinnerApp";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  async function checkUser() {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUser(result);
        setloading(false);
      })
      .catch((err) => {
        console.log("no logueado");
        console.log(err);
        setloading(false);
      });
    /* try {
      let resultUser = await Auth.currentAuthenticatedUser();
      setUser(user);
      setloading(false);
      console.log("respuesta", resultUser);
    } catch (error) {
      console.log(error);
      setUser(null);
      setloading(false);
    } */
  }

  useEffect(() => {
    console.log("cargando usuarios");
    checkUser();

    /*  function currentUser() {
      Auth.currentAuthenticatedUser()
        .then((user) => setUser(user), console.log(user))
        .catch((err) => console.log(err));
    }
    currentUser();*/

    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          checkUser();
          break;
        case "signUp":
          console.log("Nuevo registro");
          checkUser();
          break;
        case "signOut":
          setUser(null);
          console.log("Cerro sesion");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          break;
      }
    });
  }, []);

  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);
  return loading ? (
    <SpinnerApp />
  ) : (
    <UserContext.Provider value={value} {...props} />
  );
}

export function useCurrentUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      "UserContext debe estar dentro de un proveedor de UserContext"
    );
  }
  return context;
}
