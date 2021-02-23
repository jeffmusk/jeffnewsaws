import React, { useEffect, useMemo, useState, createContext } from "react";
import { Hub, Auth } from "aws-amplify";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("cargando usuarios");
    function currentUser() {
      Auth.currentSession()
        .then((data) => setUser(data.idToken.payload))
        .catch((err) => console.log(err));
    }
    currentUser();
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("inicio de sesion");
          currentUser();
          break;
        case "signUp":
          console.log("user signed up");
          currentUser();
          break;
        case "signOut":
          setUser(null);
          console.log("user signed out");
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
  return <UserContext.Provider value={value} {...props} />;
}

export function useUsuario() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      "UserContext debe estar dentro de un proveedor de UserContext"
    );
  }
  return context;
}
